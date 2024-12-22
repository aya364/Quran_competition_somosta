
const express = require('express');
const Registration = require('../models/Registration');
const ExcelJS = require('exceljs');
const colors = ['FFFFA6', 'FFC2B280', 'FFD0FFA1', 'FFEBE9E7', 'FFFBF5D0', 'FFCCF7FF', 'FFB5DBFF', 'FFEBE2E0', 'FFEAFF80','FFB1D4E0','FFF8D210','FFD8A7B1','FF2E8BC0','FF3D5B59','FFF4EBD0','FFEFC081','FFFAE8E0','FFECE3F0','FF4297A0','FF2F5061','FF333652','FFE4B4B4']; // مجموعة ألوان عشوائية

const router = express.Router();

router.get('/download', async (req, res) => {
  try {
    const registrations = await Registration.find();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Registrations');

    worksheet.columns = [
      { header: 'الأجزاء', key: 'parts', width: 10 },
      { header: 'تاريخ الميلاد', key: 'dob', width: 15 },
      { header: 'الهاتف', key: 'phone', width: 15 },
      { header: 'البلد', key: 'country', width: 20 },
      { header: 'الاسم', key: 'name', width: 20 },
    ];

    // Apply header styles
    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true, size: 14 };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFFFF' },
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    // Keep track of assigned colors for each country
    const countryColors = {};
    let colorIndex = 0;

    registrations.forEach((registration) => {
      // Assign a unique color for each country if not already assigned
      if (!countryColors[registration.country]) {
        countryColors[registration.country] = colors[colorIndex % colors.length];
        colorIndex++;
      }

      // Add a new row for the registration
      const row = worksheet.addRow({
        parts: registration.parts,
        dob: registration.dob.toISOString().split('T')[0],
        phone: registration.phone,
        country: registration.country,
        name: registration.name,
      });

      // Style each cell in the row
      row.eachCell((cell) => {
        cell.font = { size: 14 };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };

        // Apply the assigned color for the country
        const color = countryColors[registration.country];
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: color },
        };
      });
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=registrations.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Error generating Excel file', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;
