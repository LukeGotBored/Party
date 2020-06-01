const Canvas = require("canvas");

module.exports = {
  numtok: numtok,
  getUser: getUser,
  scan: scan,
  rgbToHSL: rgbToHSL,
  hslToRGB: hslToRGB,
  parseEmoji: parseEmoji,
  convolutionFilter: convolutionFilter
};


function numtok(num) {
    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
}


function getUser(message, toFind = "") {
  
  if (message.channel.type !== "text") return message.author // DMs
  
  toFind = toFind.toLowerCase();
  let target = message.guild.members.get(toFind);
  
  if (!target && message.mentions.members)
    target = message.mentions.members.first();

  if (!target && toFind) {
    target = message.guild.members.find(
      member =>
        member.displayName.toLowerCase().includes(toFind) ||
        member.user.tag.toLowerCase().includes(toFind)
    );
  }

  if (!target) {
    target = message.member;
  }

  return target.user;
}

function scan(imageData, scanner) {
  let i = 0;
  while (i < imageData.data.length) {
    let r = imageData.data[i];
    let g = imageData.data[i + 1];
    let b = imageData.data[i + 2];
    let a = imageData.data[i + 3];
    scanner(r, g, b, a, i);
    i += 4;
  }
}

function rgbToHSL(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  let h;
  let s;
  let l;
  let min = Math.min(r, g, b);
  let max = Math.max(r, g, b);
  let diff = max - min;

  if (diff == 0) h = 0;
  else if (max === r) h = ((g - b) / diff) % 6;
  else if (max === g) h = (b - r) / diff + 2;
  else if (max === b) h = (r - g) / diff + 4;

  h *= 60;

  if (h < 0) h += 360;

  l = (max + min) / 2;

  if (diff === 0) s = 0;
  else s = diff / (1 - Math.abs(2 * l - 1));

  return [h, s * 100, l * 100];
}

function hslToRGB(h, s, l) {
  h /= 60;
  s /= 100;
  l /= 100;
  const chroma = (1 - Math.abs(2 * l - 1)) * s;
  const x = chroma * (1 - Math.abs((h % 2) - 1));
  const m = l - chroma / 2;
  let rgb = [0, 0, 0];

  if (0 <= h && h <= 1) rgb = [chroma, x, 0];
  else if (1 <= h && h <= 2) rgb = [x, chroma, 0];
  else if (2 <= h && h <= 3) rgb = [0, chroma, x];
  else if (3 <= h && h <= 4) rgb = [0, x, chroma];
  else if (4 <= h && h <= 5) rgb = [x, 0, chroma];
  else if (5 <= h && h <= 6) rgb = [chroma, 0, x];

  rgb[0] = (rgb[0] + m) * 255;
  rgb[1] = (rgb[1] + m) * 255;
  rgb[2] = (rgb[2] + m) * 255;

  return rgb;
}

function parseEmoji(emoji) {
  const possibleEmoji = emoji.match(/<a?:[0-9a-z_]{2,}:[0-9]+>/gi);
  if (!possibleEmoji) return {};
  let properties = possibleEmoji[0].slice(1, -1).split(":");
  let animated = false;
  if (properties[0] == "a") animated = true;
  const name = properties[1];
  const id = properties[2];
  let url = "https://cdn.discordapp.com/emojis/" + id;
  if (animated) url += ".gif";
  else url += ".png";
  return { name, id, animated, url };
}

async function convolutionFilter(
  srcImageData,
  matrixX,
  matrixY,
  matrix,
  divisor,
  bias = 0,
  preserveAlpha = true,
  clamp = true,
  color = 0,
  alpha = 0
) {
  var srcPixels = srcImageData.data,
    srcWidth = srcImageData.width,
    srcHeight = srcImageData.height,
    srcLength = srcPixels.length,
    dstImageData = Canvas.createCanvas(srcWidth, srcHeight)
      .getContext("2d")
      .getImageData(0, 0, srcWidth, srcHeight),
    dstPixels = dstImageData.data;

  var index = 0,
    rows = matrixX >> 1,
    cols = matrixY >> 1,
    clampR = (color >> 16) & 0xff,
    clampG = (color >> 8) & 0xff,
    clampB = color & 0xff,
    clampA = alpha * 0xff;

  for (var y = 0; y < srcHeight; y += 1) {
    for (var x = 0; x < srcWidth; x += 1, index += 4) {
      var r = 0,
        g = 0,
        b = 0,
        a = 0,
        replace = false,
        mIndex = 0,
        v;

      for (var row = -rows; row <= rows; row += 1) {
        var rowIndex = y + row,
          offset;

        if (0 <= rowIndex && rowIndex < srcHeight) {
          offset = rowIndex * srcWidth;
        } else if (clamp) {
          offset = y * srcWidth;
        } else {
          replace = true;
        }

        for (var col = -cols; col <= cols; col += 1) {
          var m = matrix[mIndex++];

          if (m !== 0) {
            var colIndex = x + col;

            if (!(0 <= colIndex && colIndex < srcWidth)) {
              if (clamp) {
                colIndex = x;
              } else {
                replace = true;
              }
            }

            if (replace) {
              r += m * clampR;
              g += m * clampG;
              b += m * clampB;
              a += m * clampA;
            } else {
              var p = (offset + colIndex) << 2;
              r += m * srcPixels[p];
              g += m * srcPixels[p + 1];
              b += m * srcPixels[p + 2];
              a += m * srcPixels[p + 3];
            }
          }
        }
      }

      dstPixels[index] =
        (v = r / divisor + bias) > 255 ? 255 : v < 0 ? 0 : v | 0;
      dstPixels[index + 1] =
        (v = g / divisor + bias) > 255 ? 255 : v < 0 ? 0 : v | 0;
      dstPixels[index + 2] =
        (v = b / divisor + bias) > 255 ? 255 : v < 0 ? 0 : v | 0;
      dstPixels[index + 3] = preserveAlpha
        ? srcPixels[index + 3]
        : (v = a / divisor + bias) > 255
        ? 255
        : v < 0
        ? 0
        : v | 0;
    }
  }

  return dstImageData;
}
