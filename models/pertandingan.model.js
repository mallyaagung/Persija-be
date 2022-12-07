const db = require("../config/db");

module.exports = {
  addPertandingan: (body) =>
    new Promise((resolve, reject) => {
      const {
        id,
        lawan_pertandingan,
        tanggal_pertandingan,
        is_approved = "No",
        id_surat1,
        id_surat2,
        id_surat3,
        id_surat4,
        id_surat5,
        id_surat6,
        id_surat7,
        id_surat8,
        id_surat9,
        id_surat10,
      } = body;

      db.query(
        `with new_match as ( 
          insert into pertandingan (id, lawan_pertandingan, tanggal_pertandingan, is_approved) values ($1, $2, $3, $4)
          returning id
        )
        insert into administrasi (id, jenis_surat, status, pertandingan_id)
        values 
        ($5, 'Surat Rekomendasi Federasi (PSSI)', 'Pending',(select id from new_match)),
        ($6, 'Surat Rekomendasi Kemenpora', 'Pending',(select id from new_match)),
        ($7, 'Surat Rekomendasi Dinas Kesehatan', 'Pending',(select id from new_match)),
        ($8, 'Renpam Panpel', 'Pending',(select id from new_match)),
        ($9, 'SK Panpel', 'Pending',(select id from new_match)),
        ($10, 'Pengelola Stadion dan Dispora terkait penggunaan stadion', 'Pending',(select id from new_match)),
        ($11, 'Dinas Kesehatan terkait dukungan ambulan, tenaga medis, awak tandu', 'Pending',(select id from new_match)),
        ($12, 'Dinas Pemadam Kebakaran terkait dukungan (tim) pemadam kebakaran', 'Pending',(select id from new_match)),
        ($13, 'Badan Pendapatan Daerah terkait porporasi tiket pertandingan', 'Pending',(select id from new_match)),
        ($14, 'Rumah Sakit terdekat terkait Rumah Sakit rujukan', 'Pending',(select id from new_match));`,
        [
          id,
          lawan_pertandingan,
          tanggal_pertandingan,
          is_approved,
          id_surat1,
          id_surat2,
          id_surat3,
          id_surat4,
          id_surat5,
          id_surat6,
          id_surat7,
          id_surat8,
          id_surat9,
          id_surat10,
        ],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
  selectAllPertandingan: (paging) =>
    new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM pertandingan LIMIT ${paging.limit} OFFSET ${paging.offset}`,
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
  selectPertandinganById: (id) =>
    new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM pertandingan WHERE id=$1",
        [id],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
  updatePertandinganById: (id, body) =>
    new Promise((resolve, reject) => {
      const { lawan_pertandingan, tanggal_pertandingan } = body;

      db.query(
        "UPDATE pertandingan SET lawan_pertandingan=$1, tanggal_pertandingan=$2 WHERE id=$3",
        [lawan_pertandingan, tanggal_pertandingan, id],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
  removePertandinganById: (id) =>
    new Promise((resolve, reject) => {
      db.query(
        "DELETE FROM pertandingan WHERE id=$1",
        [id],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
  countAllPertandingan: () =>
    new Promise((resolve, reject) => {
      db.query("SELECT COUNT(*) FROM pertandingan", (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    }),
};
