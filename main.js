import Validation from "./validation";
const validation = new Validation();


// Lấy phần tử HTML theo ID
export const getEleId = (id) => document.getElementById(id);

// Đối tượng nhân viên
class Employee {
  constructor(taiKhoan, hoTen, email, matKhau, ngayLam, luongCB, chucVu, gioLam) {
    this.taiKhoan = taiKhoan;
    this.hoTen = hoTen;
    this.email = email;
    this.matKhau = matKhau;
    this.ngayLam = ngayLam;
    this.luongCB = luongCB;
    this.chucVu = chucVu;
    this.gioLam = gioLam;
    this.tongLuong = 0;
    this.loaiNhanVien = "";
  }

  // Phương thức tính tổng lương
  tinhTongLuong() {
    if (this.chucVu === "Giám đốc") {
      this.tongLuong = this.luongCB * 3;
    } else if (this.chucVu === "Trưởng phòng") {
      this.tongLuong = this.luongCB * 2;
    } else {
      this.tongLuong = this.luongCB;
    }
  }

  // Phương thức xếp loại nhân viên
  xepLoai() {
    if (this.gioLam >= 192) {
      this.loaiNhanVien = "Xuất sắc";
    } else if (this.gioLam >= 176) {
      this.loaiNhanVien = "Giỏi";
    } else if (this.gioLam >= 160) {
      this.loaiNhanVien = "Khá";
    } else {
      this.loaiNhanVien = "Trung bình";
    }
  }
}

// Xử lý form và tạo đối tượng nhân viên
const getInfoEmployee = (isAdd) => {
  const taiKhoan = getEleId("tknv").value;
  const hoTen = getEleId("name").value;
  const email = getEleId("email").value;
  const matKhau = getEleId("password").value;
  const ngayLam = getEleId("datepicker").value;
  const luongCB = parseFloat(getEleId("luongCB").value);
  const chucVu = getEleId("chucvu").value;
  const gioLam = parseInt(getEleId("gioLam").value);

  let isValid = true;

  // Kiểm tra tính hợp lệ của dữ liệu nhập vào
  isValid &= validation.checkEmpty(taiKhoan, "tbTKNV", "Tài khoản không được để trống!") &&
    validation.checkLength(taiKhoan, 4, 6, "tbTKNV", "Tài khoản phải từ 4 đến 6 ký tự!");

  isValid &= validation.checkCharacterString(hoTen, "tbTen", "Tên nhân viên phải là chữ!") &&
    validation.checkEmpty(hoTen, "tbTen", "Tên nhân viên không được để trống!");

  isValid &= validation.checkEmail(email, "tbEmail", "Email không hợp lệ!") &&
    validation.checkEmpty(email, "tbEmail", "Email không được để trống!");

  isValid &= validation.checkPassword(matKhau, "tbMatKhau", "Mật khẩu phải từ 6-10 ký tự, có ít nhất 1 ký tự số, 1 ký tự in hoa và 1 ký tự đặc biệt!") &&
    validation.checkEmpty(matKhau, "tbMatKhau", "Mật khẩu không được để trống!");

  isValid &= validation.checkEmpty(ngayLam, "tbNgay", "Ngày làm không được để trống!") &&
    validation.checkDate(ngayLam, "tbNgay", "Ngày làm phải đúng định dạng mm/dd/yyyy!");

  isValid &= validation.checkEmpty(luongCB, "tbLuongCB", "Lương cơ bản không được để trống!") &&
    validation.checkRange(luongCB, 1000000, 20000000, "tbLuongCB", "Lương cơ bản phải từ 1 triệu đến 20 triệu!");

  isValid &= validation.checkSelect("chucvu", "tbChucVu", "Chức vụ không hợp lệ!");

  isValid &= validation.checkRange(gioLam, 80, 200, "tbGiolam", "Giờ làm phải từ 80 đến 200 giờ!");

  if (!isValid) return null;

  // Tạo đối tượng nhân viên
  const employee = new Employee(taiKhoan, hoTen, email, matKhau, ngayLam, luongCB, chucVu, gioLam);

  // Tính tổng lương và xếp loại
  employee.tinhTongLuong();
  employee.xepLoai();

  return employee;
};

// Hàm render danh sách nhân viên
const renderEmployeeList = (data) => {
  let content = "";
  for (let i = 0; i < data.length; i++) {
    const employee = data[i];
    content += `
      <tr>
        <td>${employee.taiKhoan}</td>
        <td>${employee.hoTen}</td>
        <td>${employee.email}</td>
        <td>${employee.ngayLam}</td>
        <td>${employee.chucVu}</td>
        <td>${employee.tongLuong}</td>
        <td>${employee.loaiNhanVien}</td>
        <td>
          <button class="btn btn-warning" onclick="editEmployee(${i})">Sửa</button>
          <button class="btn btn-danger" onclick="deleteEmployee(${i})">Xóa</button>
        </td>
      </tr>
    `;
  }
  getEleId("tableDanhSach").innerHTML = content;
};

// Thêm nhân viên vào danh sách
const addEmployee = () => {
  const employee = getInfoEmployee(true);
  if (employee) {
    employeeList.push(employee);
    renderEmployeeList(employeeList);
    resetForm();
  }
};

// Cập nhật nhân viên
const updateEmployee = (index) => {
  const employee = getInfoEmployee(false);
  if (employee) {
    employeeList[index] = employee;
    renderEmployeeList(employeeList);
    resetForm();
  }
};

// Xóa nhân viên
const deleteEmployee = (index) => {
  employeeList.splice(index, 1);
  renderEmployeeList(employeeList);
};

// Reset form
const resetForm = () => {
  getEleId("tknv").value = "";
  getEleId("name").value = "";
  getEleId("email").value = "";
  getEleId("password").value = "";
  getEleId("datepicker").value = "";
  getEleId("luongCB").value = "";
  getEleId("chucvu").value = "";
  getEleId("gioLam").value = "";
};

// Danh sách nhân viên (dùng mảng để lưu trữ)
const employeeList = [];

// Khởi tạo sự kiện cho các nút
getEleId("btnThemNV").addEventListener("click", addEmployee);
getEleId("btnCapNhat").addEventListener("click", updateEmployee);
