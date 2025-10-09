class Mahasiswa {
  constructor(nama, nim, angkatan, semester) {
    this.nama = nama ?? "";
    this.nim = nim ?? "";
    this.angkatan = angkatan ?? "";
    this.semester = semester ?? 0;
  }
}

class HitungTahunMasuk extends Mahasiswa {
  getTahunMasuk() {
    const tahunSekarang = new Date().getFullYear();
    const yearsPassed = Math.floor((this.semester - 1) / 2);
    return tahunSekarang - yearsPassed;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const hasilContainer = document.getElementById("hasilData");

  const nama = params.get("nama") ?? "";
  const nim = params.get("nim") ?? "";
  const angkatan = params.get("angkatan") ?? "";
  const semester = parseInt(params.get("semester") ?? "0", 10) || 0;
  const jenis = params.get("jenisPenelitian") ?? "";

  const mahasiswa = new HitungTahunMasuk(nama, nim, angkatan, semester);
  const tahunMasuk = mahasiswa.getTahunMasuk();

  let html = "";
  html += `<p><span>Nama:</span> ${escapeHtml(nama)}</p>`;
  html += `<p><span>NIM:</span> ${escapeHtml(nim)}</p>`;
  html += `<p><span>Angkatan:</span> ${escapeHtml(angkatan)}</p>`;
  html += `<p><span>Semester:</span> ${escapeHtml(String(semester))}</p>`;
  html += `<p><span>Tahun Masuk (hasil perhitungan inheritance):</span> ${escapeHtml(String(tahunMasuk))}</p>`;
  html += `<p><span>Jenis Penelitian:</span> ${escapeHtml(jenis)}</p>`;

  if (jenis === "paper") {
    html += `<p><span>Nama Penulis:</span> ${escapeHtml(params.get("namaPenulisPaper") ?? "")}</p>`;
    html += `<p><span>Judul Paper:</span> ${escapeHtml(params.get("judulPaper") ?? "")}</p>`;
    html += `<p><span>Tahun Publikasi:</span> ${escapeHtml(params.get("tahunPaper") ?? "")}</p>`;
    html += `<p><span>Volume/Edisi/Halaman:</span> ${escapeHtml(params.get("volPaper") ?? "")}</p>`;
    html += `<p><span>DOI:</span> ${escapeHtml(params.get("doiPaper") ?? "")}</p>`;
  } else if (jenis === "buku") {
    html += `<p><span>Nama Penulis Buku:</span> ${escapeHtml(params.get("namaPenulisBuku") ?? "")}</p>`;
    html += `<p><span>Judul Buku:</span> ${escapeHtml(params.get("judulBuku") ?? "")}</p>`;
    html += `<p><span>Tahun Publikasi Buku:</span> ${escapeHtml(params.get("tahunBuku") ?? "")}</p>`;
    html += `<p><span>Volume/Edisi/Halaman:</span> ${escapeHtml(params.get("volBuku") ?? "")}</p>`;
    html += `<p><span>ISBN:</span> ${escapeHtml(params.get("isbnBuku") ?? "")}</p>`;
  } else if (jenis === "jurnal") {
    html += `<p><em>Tidak ada data tambahan untuk Jurnal Pengabdian.</em></p>`;
  }

  hasilContainer.innerHTML = html;

  document.getElementById("btnKembali").addEventListener("click", () => {
    window.location.href = "index.html";
  });
});

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
