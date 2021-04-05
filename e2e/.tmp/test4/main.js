(async function () {
  const fs_readdirPromise = require('util').promisify(require('fs').readdir);

  const fs_accessPromise = require('util').promisify(require('fs').access);

  const fs_appendFilePromise = require('util').promisify(require('fs').appendFile);

  const fs_chmodPromise = require('util').promisify(require('fs').chmod);

  const fs_fchmodPromise = require('util').promisify(require('fs').fchmod);

  const fs_lchmodPromise = require('util').promisify(require('fs').lchmod);

  const fs_chownPromise = require('util').promisify(require('fs').chown);

  const fs_fchownPromise = require('util').promisify(require('fs').fchown);

  const fs_lchownPromise = require('util').promisify(require('fs').lchown);

  const fs_mkdirPromise = require('util').promisify(require('fs').mkdir);

  const fs_mkdtempPromise = require('util').promisify(require('fs').mkdtemp);

  const fs_statPromise = require('util').promisify(require('fs').stat);

  const fs_fstatPromise = require('util').promisify(require('fs').fstat);

  const fs_lstatPromise = require('util').promisify(require('fs').lstat);

  const fs_linkPromise = require('util').promisify(require('fs').link);

  const fs_symlinkPromise = require('util').promisify(require('fs').symlink);

  const fs_readlinkPromise = require('util').promisify(require('fs').readlink);

  const fs_realpathPromise = require('util').promisify(require('fs').realpath);

  const fs_unlinkPromise = require('util').promisify(require('fs').unlink);

  const fs_rmdirPromise = require('util').promisify(require('fs').rmdir);

  const fs_renamePromise = require('util').promisify(require('fs').rename);

  const fs_openPromise = require('util').promisify(require('fs').open);

  const fs_closePromise = require('util').promisify(require('fs').close);

  const fs_copyFilePromise = require('util').promisify(require('fs').copyFile);

  const fs_truncatePromise = require('util').promisify(require('fs').truncate);

  const fs_ftruncatePromise = require('util').promisify(require('fs').ftruncate);

  const fs_utimesPromise = require('util').promisify(require('fs').utimes);

  const fs_futimesPromise = require('util').promisify(require('fs').futimes);

  const fs_fsyncPromise = require('util').promisify(require('fs').fsync);

  const fs_readPromise = require('util').promisify(require('fs').read);

  const fs_writePromise = require('util').promisify(require('fs').write);

  const fs_fdatasyncPromise = require('util').promisify(require('fs').fdatasync);

  const zlib_gzipPromise = require('util').promisify(require('zlib').gzip);

  const zlib_gunzipPromise = require('util').promisify(require('zlib').gunzip);

  const zlib_brotliCompressPromise = require('util').promisify(require('zlib').brotliCompress);

  const zlib_brotliDecompressPromise = require('util').promisify(require('zlib').brotliDecompress);

  const zlib_deflatePromise = require('util').promisify(require('zlib').deflate);

  const zlib_inflatePromise = require('util').promisify(require('zlib').inflate);

  const zlib_deflateRawPromise = require('util').promisify(require('zlib').deflateRaw);

  const zlib_inflateRawPromise = require('util').promisify(require('zlib').inflateRaw);

  const zlib_unzipPromise = require('util').promisify(require('zlib').unzip);

  const child_process_execPromise = require('util').promisify(require('child_process').exec);

  const child_process_spawnPromise = require('util').promisify(require('child_process').spawn);

  const child_process_execFilePromise = require('util').promisify(require('child_process').execFile);

  const crypto_pbkdf2Promise = require('util').promisify(require('crypto').pbkdf2);

  const crypto_generateKeyPairPromise = require('util').promisify(require('crypto').generateKeyPair);

  const crypto_randomFillPromise = require('util').promisify(require('crypto').randomFill);

  const crypto_scryptPromise = require('util').promisify(require('crypto').scrypt);

  const path_existsPromise = require('util').promisify(require('path').exists);

  const jsonfile_readFilePromise = require('util').promisify(require('jsonfile').readFile);

  const jsonfile_writeFilePromise = require('util').promisify(require('jsonfile').writeFile);

  const fs = require('fs');

  const zlib = require('zlib');

  const cp = require('child_process');

  const crypto = require('crypto');

  const path = require('path');

  const jsonfile = require('jsonfile');

  await jsonfile_readFilePromise();
  await jsonfile_writeFilePromise();
  await fs_readdirPromise();
  await fs_accessPromise();
  await fs_appendFilePromise();
  await fs_chmodPromise();
  await fs_fchmodPromise();
  await fs_lchmodPromise();
  await fs_chownPromise();
  await fs_fchownPromise();
  await fs_lchownPromise();
  await fs_mkdirPromise();
  await fs_mkdtempPromise();
  await fs_statPromise();
  await fs_fstatPromise();
  await fs_lstatPromise();
  await fs_linkPromise();
  await fs_symlinkPromise();
  await fs_readlinkPromise();
  await fs_realpathPromise();
  await fs_unlinkPromise();
  await fs_rmdirPromise();
  await fs_renamePromise();
  await fs_openPromise();
  await fs_closePromise();
  await path_existsPromise();
  await fs_copyFilePromise();
  await fs_truncatePromise();
  await fs_ftruncatePromise();
  await fs_utimesPromise();
  await fs_futimesPromise();
  await fs_fsyncPromise();
  await fs_readPromise();
  await fs_writePromise();
  await fs_fdatasyncPromise();
  await zlib_gzipPromise();
  await zlib_gunzipPromise();
  await zlib_brotliCompressPromise();
  await zlib_brotliDecompressPromise();
  await zlib_deflatePromise();
  await zlib_inflatePromise();
  await zlib_deflateRawPromise();
  await zlib_inflateRawPromise();
  await zlib_unzipPromise();
  await child_process_execPromise();
  await child_process_spawnPromise();
  await child_process_execFilePromise();
  await crypto_pbkdf2Promise();
  await crypto_generateKeyPairPromise();
  await crypto_randomFillPromise();
  await crypto_scryptPromise();
  await path_existsPromise();
  await jsonfile_readFilePromise();
  await jsonfile_writeFilePromise();
})();