# Blog Engine Sederhana

Repository ini berisi contoh implementasi blog engine sederhana dengan NodeJS dan ExpressJS. Commit yang ada di repository memperlihatkan perkembangan kode, tahap demi tahap, yang bisa juga dijadikan bahan pembelajaran.

Untuk melihat seluruh commit yang ada gunakan perintah:

    $ git log

Kalau ingin melihat seluruh isi file pada commit tertentu, jalankan perintah:

    $ git checkout <nomor-commit>

Misalnya untuk melihat commit paling pertama:

    $ git checkout 03c7f40

Kalau mau kembali ke kode terbaru, checkout ke `HEAD`:

    $ git checkout HEAD

Jika ingin melihat seluruh nomor commit yang ada dengan lebih mudah, gunakan perintah:

    $ git log --oneline

## Dependencies

Sebelum bisa menjalankan blog, pastikan beberapa hal telah ada:

1. Database MySQL atau MariaDB, dengan model tabel sesuai dengan yang ada pada pada direktori `data`.
2. Environment variabel berikut dikonfigurasikan:

    a. `MARIADB_HOST`, berisi *hostname* dari sistem basis data.
    b. `MARIADB_USER`, berisi pengguna yang dapat mengakses basis data.
    c. `MARIADB_PASSWORD`, berisi password pengguna pada (b).
    d. `MARIADB_DB_BLOG`, berisi nama basis data yang akan digunakan.

Dari sisi NodeJS, sebelum memasang *dependency* melalui `npm`, terlebih dahulu jalankan perintah berikut (pada Windows):

    $ npm install -g gulp
    $ npm install -g node-gyp

untuk pengguna Linux dan Mac, gunakan sudo:

    $ sudo npm install -g gulp
    $ sudo npm install -g node-gyp

Setelah perintah selesai dieksekusi, pasang *dependency* dengan perintah:

    $ npm install

baik di Mac, Windows, ataupun Linux. 

## Menjalankan Blog

Hanya ada satu perintah untuk menjalankan blog, yaitu:

    $ gulp server

Dan blog akan dapat diakses pada `http://localhost:3000/`.
