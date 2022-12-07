const { v4: uuidv4 } = require("uuid");
const pertandinganModel = require("../models/pertandingan.model");
const createPagination = require("../utils/createPagination");
const { success, failed } = require("../utils/createResponse");

module.exports = {
  listMatch: async (req, res) => {
    try {
      const { page, limit } = req.query;
      const count = await pertandinganModel.countAllPertandingan();
      const paging = createPagination(count.rows[0].count, page, limit);
      const match = await pertandinganModel.selectAllPertandingan(paging);

      success(res, {
        code: 200,
        payload: match.rows,
        message: "Select Pertandingan Success",
        pagination: paging.response,
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: "Internal Server Error",
      });
    }
  },
  detailMatch: async (req, res) => {
    try {
      const { id } = req.params;
      const match = await pertandinganModel.selectPertandinganById(id);

      if (!match.rowCount) {
        failed(res, {
          code: 404,
          payload: `Match with Id ${id} not found`,
          message: "Select Detail Match Failed",
        });
        return;
      }

      success(res, {
        code: 200,
        payload: match.rows[0],
        message: "Select Detail Match Success",
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: "Internal Server Error",
      });
    }
  },
  addMatch: async (req, res) => {
    try {
      const data = {
        id: uuidv4(),
        id_surat1: uuidv4(),
        id_surat2: uuidv4(),
        id_surat3: uuidv4(),
        id_surat4: uuidv4(),
        id_surat5: uuidv4(),
        id_surat6: uuidv4(),
        id_surat7: uuidv4(),
        id_surat8: uuidv4(),
        id_surat9: uuidv4(),
        id_surat10: uuidv4(),
        ...req.body,
      };
      pertandinganModel
        .addPertandingan(data)
        .then((result) => {
          const data = {
            code: 200,
            payload: result,
            message: "Input data pertandingan success",
          };
          success(res, data);
        })
        .catch((err) => {
          const data = {
            code: 404,
            payload: err,
            message: "Input data pertandingan failed",
          };
          failed(res, data);
        });
    } catch (err) {
      const data = {
        code: 404,
        payload: err,
        message: "Input data pertandingan failed",
      };
      failed(res, data);
    }
  },
  updateMatch: async (req, res) => {
    try {
      const { id } = req.params;
      const match = await pertandinganModel.selectPertandinganById(id);
      // jika user tidak ditemukan
      if (!match.rowCount) {
        failed(res, {
          code: 404,
          payload: `Pertandingan with Id ${id} not found`,
          message: "Update Pertandingan Failed",
        });
        return;
      }

      pertandinganModel.updatePertandinganById(id, ...req.body);
      success(res, {
        code: 200,
        payload: null,
        message: "Update Pertandingan Success",
      });
    } catch {
      failed(res, {
        code: 500,
        payload: error.message,
        message: "Internal Server Error",
      });
    }
  },
  removeMatch: async (req, res) => {
    try {
      const { id } = req.params;
      const match = await pertandinganModel.selectPertandinganById(id);

      if (!match.rowCount) {
        failed(res, {
          code: 404,
          payload: `Pertandingan with Id ${id} not found`,
          message: "Delete Pertandingan Failed",
        });
        return;
      }
      await pertandinganModel.removePertandinganById(id);

      success(res, {
        code: 200,
        payload: null,
        message: "Delete Pertandingan Success",
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: "Internal Server Error",
      });
    }
  },
};
