let employees = []; // Mảng nhân viên lưu trữ tất cả nhân viên
let currentEditIndex = -1; // Biến lưu chỉ số nhân viên đang sửa

// Hàm tính tổng lương
function calculateTotalSalary(position, basicSalary) {
    switch (position) {
        case 'Giám đốc':
            return basicSalary * 3;
        case 'Trưởng phòng':
            return basicSalary * 2;
        default:
            return basicSalary;
    }
}

// Hàm xếp loại nhân viên
function classifyEmployee(hours) {
    if (hours >= 192) return 'Xuất sắc';
    if (hours >= 176) return 'Giỏi';
    if (hours >= 160) return 'Khá';
    return 'Trung bình';
}

// Hàm thêm nhân viên
function addEmployee(event) {
    event.preventDefault();

    // Lấy giá trị từ form
    const account = document.getElementById("account").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const position = document.getElementById("position").value;
    const salary = parseInt(document.getElementById("salary").value);
    const hours = parseInt(document.getElementById("hours").value);
    const type = classifyEmployee(hours);
    const totalSalary = calculateTotalSalary(position, salary);

    // Kiểm tra hợp lệ
    if (!validateForm(account, name, email, password, salary, hours)) {
        alert("Dữ liệu không hợp lệ!");
        return;
    }

    // Tạo đối tượng nhân viên
    const employee = {
        account,
        name,
        email,
        password,
        position,
        salary,
        hours,
        totalSalary,
        type
    };

    if (currentEditIndex === -1) {
        // Thêm mới nhân viên
        employees.push(employee);
    } else {
        // Cập nhật nhân viên
        employees[currentEditIndex] = employee;
        currentEditIndex = -1; // Reset lại sau khi cập nhật
    }

    // Hiển thị bảng nhân viên
    renderEmployeeTable();
    resetForm();
}

// Hàm hiển thị bảng nhân viên
function renderEmployeeTable() {
    const tableBody = document.querySelector("#employee-table tbody");
    tableBody.innerHTML = "";

    employees.forEach((employee, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${employee.account}</td>
            <td>${employee.name}</td>
            <td>${employee.email}</td>
            <td>${employee.salary}</td>
            <td>${employee.position}</td>
            <td>${employee.hours}</td>
            <td>${employee.totalSalary}</td>
            <td>${employee.type}</td>
            <td>
                <button onclick="editEmployee(${index})">Sửa</button>
                <button onclick="deleteEmployee(${index})">Xóa</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Hàm chỉnh sửa nhân viên
function editEmployee(index) {
    const employee = employees[index];
    
    // Điền dữ liệu vào form
    document.getElementById("account").value = employee.account;
    document.getElementById("name").value = employee.name;
    document.getElementById("email").value = employee.email;
    document.getElementById("password").value = employee.password;
    document.getElementById("position").value = employee.position;
    document.getElementById("salary").value = employee.salary;
    document.getElementById("hours").value = employee.hours;
    document.getElementById("type").value = employee.type;
    
    // Cập nhật chỉ số nhân viên đang sửa
    currentEditIndex = index;

    // Thay đổi nút "Thêm nhân viên" thành "Cập nhật"
    document.getElementById("submit-btn").textContent = "Cập nhật nhân viên";
}

// Hàm xóa nhân viên
function deleteEmployee(index) {
    employees.splice(index, 1);
    renderEmployeeTable();
}

// Hàm kiểm tra dữ liệu hợp lệ
function validateForm(account, name, email, password, salary, hours) {
    const accountRegex = /^[0-9]{4,6}$/;
    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const passwordRegex = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[\W_]).{6,10}$/;

    if (!accountRegex.test(account)) return false;
    if (!nameRegex.test(name)) return false;
    if (!emailRegex.test(email)) return false;
    if (!passwordRegex.test(password)) return false;
    if (salary < 1000000 || salary > 20000000) return false;
    if (hours < 80 || hours > 200) return false;

    return true;
}

// Hàm lọc nhân viên theo loại
function filterEmployees() {
    const searchType = document.getElementById("search-type").value;

    const filteredEmployees = employees.filter(employee => {
        return !searchType || employee.type === searchType;
    });

    renderEmployeeTable(filteredEmployees);
}

// Hàm làm mới form
function resetForm() {
    document.getElementById("employee-form").reset();
    document.getElementById("submit-btn").textContent = "Thêm nhân viên";
}

document.getElementById("employee-form").addEventListener("submit", addEmployee);
