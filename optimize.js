"use strict";

const AWS = require("aws-sdk");
const S3 = new AWS.S3();

const sharp = require("sharp");
const { basename, extname } = require("path");

/**
 * Everytime an image is received, it's optimized before getting saved
 */
module.exports.handle = async ({ Records: records }, context) => {
  try {
    await Promise.all(
      records.map(async (record) => {
        // Key: path to the image
        const { key } = record.s3.object;

        // Getting image sent
        const image = await S3.getObject({
          Bucket: process.env.bucket,
          Key: key,
        }).promise();

        // Optimizing file
        const optimized = await sharp(image.Body)
          .resize(1280, 720, { fit: "inside", withoutEnlargement: true })
          .toFormat("jpeg", { progressive: true, quality: 50 })
          .toBuffer();

        // Saving optimized image inside compressed/(image).jpeg
        await S3.putObject({
          Body: optimized,
          Bucket: process.env.bucket,
          ContentType: "image/jpeg",
          Key: `compressed/${basename(key, extname(key))}.jpeg`,
        }).promise();
      })
    );

    // Sending back a response
    return {
      statusCode: 201,
      body: {},
    };
  } catch (error) {
    return error;
  }
};
