import { getEleId } from "./main";

class Validation {
  // Kiểm tra xem input có trống hay không
  checkEmpty(value, idError, message) {
    if (value.trim() === "") {
      getEleId(idError).innerHTML = message;
      return false;
    }
    getEleId(idError).innerHTML = "";
    return true;
  }

  // Kiểm tra độ dài của chuỗi
  checkLength(value, min, max, idError, message) {
    if (value.length < min || value.length > max) {
      getEleId(idError).innerHTML = message;
      return false;
    }
    getEleId(idError).innerHTML = "";
    return true;
  }

  // Kiểm tra chuỗi có phải là chữ không
  checkCharacterString(value, idError, message) {
    const regex = /^[A-Za-z\s]+$/;
    if (!regex.test(value)) {
      getEleId(idError).innerHTML = message;
      return false;
    }
    getEleId(idError).innerHTML = "";
    return true;
  }

  // Kiểm tra định dạng email
  checkEmail(value, idError, message) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!regex.test(value)) {
      getEleId(idError).innerHTML = message;
      return false;
    }
    getEleId(idError).innerHTML = "";
    return true;
  }

  // Kiểm tra mật khẩu
  checkPassword(value, idError, message) {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;
    if (!regex.test(value)) {
      getEleId(idError).innerHTML = message;
      return false;
    }
    getEleId(idError).innerHTML = "";
    return true;
  }

  // Kiểm tra định dạng ngày tháng (mm/dd/yyyy)
  checkDate(value, idError, message) {
    const regex = /^(0[1-9]|1[0-2])\/([0-2][0-9]|3[01])\/\d{4}$/;
    if (!regex.test(value)) {
      getEleId(idError).innerHTML = message;
      return false;
    }
    getEleId(idError).innerHTML = "";
    return true;
  }

  // Kiểm tra số giờ làm trong khoảng từ 80 đến 200
  checkRange(value, min, max, idError, message) {
    if (value < min || value > max) {
      getEleId(idError).innerHTML = message;
      return false;
    }
    getEleId(idError).innerHTML = "";
    return true;
  }

  // Kiểm tra mục chọn (chức vụ) không phải là mặc định
  checkSelect(idSelect, idError, message) {
    const select = getEleId(idSelect);
    if (select.value === "Chọn chức vụ") {
      getEleId(idError).innerHTML = message;
      return false;
    }
    getEleId(idError).innerHTML = "";
    return true;
  }
}

export default Validation;
