document.addEventListener("DOMContentLoaded", () => {
  const modalMulai = document.getElementById("modalMulai");
  const modalDaftar = document.getElementById("modalDaftar");
  const btnMulai = document.getElementById("btnMulai");
  const btnDaftar = document.getElementById("btnDaftar");
  const btnKembaliMulai = document.getElementById("btnKembaliMulai");
  const btnKembaliDaftar = document.getElementById("btnKembaliDaftar");
  const jenisPenelitian = document.getElementById("jenisPenelitian");
  const extraFields = document.getElementById("extraFields");
  const formPenelitian = document.getElementById("formPenelitian");
  const closeMulai = document.getElementById("closeMulai");
  const closeDaftar = document.getElementById("closeDaftar");

  function openModal(modal) {
    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    const focusable = modal.querySelector("input, select, button, textarea");
    if (focusable) focusable.focus();
  }
  function closeModal(modal) {
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }

  btnMulai.addEventListener("click", () => openModal(modalMulai));
  btnDaftar.addEventListener("click", () => openModal(modalDaftar));

  btnKembaliMulai.addEventListener("click", () => {
    alert("Anda akan menutup popup ini.");
    closeModal(modalMulai);
    extraFields.innerHTML = "";
    formPenelitian.reset();
  });
  btnKembaliDaftar.addEventListener("click", () => {
    alert("Anda akan menutup popup ini.");
    closeModal(modalDaftar);
  });
  closeMulai.addEventListener("click", () => {
    alert("Anda akan menutup popup ini.");
    closeModal(modalMulai);
    extraFields.innerHTML = "";
    formPenelitian.reset();
  });
  closeDaftar.addEventListener("click", () => {
    alert("Anda akan menutup popup ini.");
    closeModal(modalDaftar);
  });

  [modalMulai, modalDaftar].forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        alert("Anda akan menutup popup ini.");
        closeModal(modal);
        if (modal === modalMulai) {
          extraFields.innerHTML = "";
          formPenelitian.reset();
        }
      }
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (!modalMulai.classList.contains("hidden")) {
        alert("Anda akan menutup popup ini.");
        closeModal(modalMulai);
        extraFields.innerHTML = "";
        formPenelitian.reset();
      }
      if (!modalDaftar.classList.contains("hidden")) {
        alert("Anda akan menutup popup ini.");
        closeModal(modalDaftar);
      }
    }
  });

jenisPenelitian.addEventListener("change", () => {
  const v = jenisPenelitian.value;
  extraFields.innerHTML = "";

  if (v === "paper") {
    extraFields.innerHTML = `
      <fieldset style="border:1px solid #cfcfcf;padding:12px;border-radius:4px">
        <legend style="font-weight:600;padding:0 6px">Paper</legend>

        <div class="form-row">
          <label for="namaPenulisPaper">Nama Penulis:</label>
          <input type="text" id="namaPenulisPaper" name="namaPenulisPaper" placeholder="Nama Penulis" required />
        </div>

        <div class="form-row">
          <label for="judulPaper">Judul Paper:</label>
          <input type="text" id="judulPaper" name="judulPaper" placeholder="Judul Paper" required />
        </div>

        <div class="form-row">
          <label for="tahunPaper">Tahun Publikasi:</label>
          <input type="text" id="tahunPaper" name="tahunPaper" placeholder="Tahun Publikasi (mis. 2024)" inputmode="numeric" required />
        </div>

        <div class="form-row">
          <label for="volPaper">Volume, Edisi, Halaman:</label>
          <input type="text" id="volPaper" name="volPaper" placeholder="Vol/No/Edisi/Halaman" required />
        </div>

        <div class="form-row">
          <label for="doiPaper">Digital Object Identifier (DOI):</label>
          <input type="text" id="doiPaper" name="doiPaper" placeholder="10.xxxx/xxxx" required />
        </div>
      </fieldset>
    `;
  } else if (v === "buku") {
    extraFields.innerHTML = `
      <fieldset style="border:1px solid #cfcfcf;padding:12px;border-radius:4px">
        <legend style="font-weight:600;padding:0 6px">Buku</legend>

        <div class="form-row">
          <label for="namaPenulisBuku">Nama Penulis Buku:</label>
          <input type="text" id="namaPenulisBuku" name="namaPenulisBuku" placeholder="Nama Penulis Buku" required />
        </div>
        
        <div class="form-row">
          <label for="judulBuku">Judul Buku:</label>
          <input type="text" id="judulBuku" name="judulBuku" placeholder="Judul Buku" required />
        </div>

        <div class="form-row">
          <label for="tahunBuku">Tahun Publikasi Buku:</label>
          <input type="text" id="tahunBuku" name="tahunBuku" placeholder="Tahun Publikasi (mis. 2021)" inputmode="numeric" required />
        </div>

        <div class="form-row">
          <label for="volBuku">Volume, Edisi, Halaman:</label>
          <input type="text" id="volBuku" name="volBuku" placeholder="Volume Buku" required />
        </div>

        <div class="form-row">
          <label for="isbnBuku">ISBN:</label>
          <input type="text" id="isbnBuku" name="isbnBuku" placeholder="ISBN" required />
        </div>
      </fieldset>
    `;
  } else {
    extraFields.innerHTML = "";
  }
});

  function isDigitsOnly(val) {
    return /^[0-9]+$/.test(val);
  }

  formPenelitian.addEventListener("submit", (ev) => {
    ev.preventDefault();

    const nama = formPenelitian.elements["nama"]?.value.trim() ?? "";
    const nim = formPenelitian.elements["nim"]?.value.trim() ?? "";
    const angkatan = formPenelitian.elements["angkatan"]?.value.trim() ?? "";
    const semesterRaw = formPenelitian.elements["semester"]?.value ?? "";
    const jenis = formPenelitian.elements["jenisPenelitian"]?.value ?? "";

    if (!nama || !nim || !angkatan || !semesterRaw || !jenis) {
      alert("Semua field harus diisi!");
      return;
    }

    if (!isDigitsOnly(nim) || !isDigitsOnly(angkatan)) {
      alert("NIM dan Angkatan harus berupa angka!");
      return;
    }

    const semester = parseInt(semesterRaw, 10);
    if (isNaN(semester) || semester < 1) {
      alert("Semester harus angka yang valid (>= 1).");
      return;
    }

    if (semester < 3) {
      alert("Mahasiswa belum dapat melakukan pengisian penelitian!");
      return;
    }

    if (jenis === "paper") {
      const namaPenulisPaper = formPenelitian.elements["namaPenulisPaper"]?.value.trim() ?? "";
      const judulPaper = formPenelitian.elements["judulPaper"]?.value.trim() ?? "";
      const tahunPaper = formPenelitian.elements["tahunPaper"]?.value.trim() ?? "";
      const volPaper = formPenelitian.elements["volPaper"]?.value.trim() ?? "";
      const doiPaper = formPenelitian.elements["doiPaper"]?.value.trim() ?? "";

      if (!namaPenulisPaper || !judulPaper || !tahunPaper || !volPaper || !doiPaper) {
        alert("Silakan isi semua field Paper (Nama Penulis, Judul, Tahun, Volume/Edisi/Halaman, DOI).");
        return;
      }
    } else if (jenis === "buku") {
      const namaPenulisBuku = formPenelitian.elements["namaPenulisBuku"]?.value.trim() ?? "";
      const judulBuku = formPenelitian.elements["judulBuku"]?.value.trim() ?? "";
      const tahunBuku = formPenelitian.elements["tahunBuku"]?.value.trim() ?? "";
      const volBuku = formPenelitian.elements["volBuku"]?.value.trim() ?? "";
      const isbnBuku = formPenelitian.elements["isbnBuku"]?.value.trim() ?? "";

      if (!namaPenulisBuku || !judulBuku || !tahunBuku || !volBuku || !isbnBuku) {
        alert("Silakan isi semua field Buku (Nama Penulis, Judul, Tahun, Volume/Edisi/Halaman, ISBN).");
        return;
      }
    } else if (jenis === "jurnal") {
    }

    const jenisLabel = jenis === "paper" ? "Paper" : jenis === "buku" ? "Buku" : "Jurnal Pengabdian";
    alert(`Pengisian ${jenisLabel} Berhasil!`);

    const fd = new FormData(formPenelitian);
    const qs = new URLSearchParams(fd).toString();

    closeModal(modalMulai);
    extraFields.innerHTML = "";
    formPenelitian.reset();

    window.location.href = `hasil.html?${qs}`;
  });
});
