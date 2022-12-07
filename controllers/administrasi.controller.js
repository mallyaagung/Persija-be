const { v4: uuidv4 } = require("uuid");
const adminModel = require("../models/administrasi.model");
const createPagination = require("../utils/createPagination");
const { success, failed } = require("../utils/createResponse");
const deleteFile = require("../utils/deleteFile");
const uploadGoogleDrive = require("../utils/uploadGoogleDrive");
const deleteGoogleDrive = require("../utils/deleteGoogleDrive");
const { datalabeling_v1beta1 } = require("googleapis");

module.exports = {
  updateFormulir: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await adminModel.selectFormById(id);
      // jika user tidak ditemukan
      if (!user.rowCount) {
        failed(res, {
          code: 404,
          payload: `Formulir with Id ${id} not found`,
          message: "Update Formulir Failed",
        });
        return;
      }

      adminModel.updateAdministrasiById(id, ...req.body);
      success(res, {
        code: 200,
        payload: null,
        message: "Update Data Success",
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: "Internal Server Error",
      });
    }
  },
  updateStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await adminModel.selectFormById(id);
      // jika user tidak ditemukan
      if (!user.rowCount) {
        failed(res, {
          code: 404,
          payload: `Formulir with Id ${id} not found`,
          message: "Update Formulir Failed",
        });
        return;
      }
      const data = {
        status: "Approved",
      };

      adminModel.isApproved(id, data);
      success(res, {
        code: 200,
        payload: null,
        message: "Data is Approved",
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: "Internal Server Error",
      });
    }
  },
  updateDokumen: async (req, res) => {
    try {
      const { id } = req.params;

      const match = await adminModel.selectFormById(id);
      // jika user tidak ditemukan
      if (!match.rowCount) {
        // menghapus photo jika ada
        if (req.files) {
          if (req.files.dokumen) {
            deleteFile(req.files.dokumen[0].path);
          }
        }

        failed(res, {
          code: 404,
          payload: `Match with Id ${id} not found`,
          message: "Update Match Failed",
        });
        return;
      }
      let { dokumen } = match.rows[0];
      if (req.files) {
        if (req.files.dokumen) {
          if (match.rows[0].dokumen) {
            await deleteGoogleDrive(match.rows[0].dokumen);
          }
          dokumen = await uploadGoogleDrive(req.files.dokumen[0]);
          deleteFile(req.files.dokumen[0].path);
        }
      }
      const data = {
        tanggal_upload: new Date(),
        dokumen,
      };

      await adminModel.updateFile(match.rows[0].id, data);

      success(res, {
        code: 200,
        payload: null,
        message: "Update Document Success",
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
