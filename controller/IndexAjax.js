// console.log(axios);
//============================GET: LẤY DỮ LIỆU TỪ SERVER BACKEND CUNG CÂP===========
var newService = new quanLySinhVienService()
var loadDuLieuSinhVien = function () {
  // var objectAjax = {
  //   url: "http://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien", //đừogn dẫn đến backend lấy dữ liệu( do backend quy địh)
  //   method: "GET", //phương thức do backend quy định
  // };
  //dùng thu viện XEOS gọi về  backend cung cấp thông tin cho backend
  var promise = newService.layThongTinSinhVien();
  //trường hợp request thành công
  promise.then(function (result) {
    //ffunotion sẽ tự động thực thi ngay khi có dữ liệu(request thành công)
    console.log(result.data);
    //sau khi lấy dữ liệu từ backend => tạo table in ra giao diện
    renderTableSinhVien(result.data);
  });
  //trường hợp thất bại]
  promise.catch(function (err) {
    //hàm này sẽ đc kích hoạt khi request thất bại trả về lỗi
    console.log(err.response.data);
  });
};
//viết hàm render table để lấy lại dữ liệu
var renderTableSinhVien = function (arrSinhVien) {
  var noiDungTable = "";
  for (var i = 0; i < arrSinhVien.length; i++) {
    //Mỗi lần duyệt lấy ra 1 đối tượng sinh viên từ trong mangSinhVien
    var sv = new SinhVien();
    sv.maSinhVien = arrSinhVien[i].maSinhVien;
    sv.tenSinhVien = arrSinhVien[i].tenSinhVien;
    sv.email = arrSinhVien[i].email;
    sv.soDienThoai = arrSinhVien[i].soDienThoai;
    sv.diemHoa = arrSinhVien[i].diemHoa;
    sv.diemLy = arrSinhVien[i].diemLy;
    sv.diemToan = arrSinhVien[i].diemToan;
    sv.diemRenLuyen = arrSinhVien[i].diemRenLuyen;
    sv.loaiSinhVien = arrSinhVien[i].loaiSinhVien;
    noiDungTable += `
                <tr>
                    <td>${sv.maSinhVien}</td>
                    <td>${sv.tenSinhVien}</td>
                    <td>${sv.email}</td>
                    <td>${sv.soDienThoai}</td>
                    <td>${sv.tinhDiemTrungBinh()}</td>
                    <td>${sv.xepLoai()}</td>
                    <td>
                        <button class="btn btn-danger" onclick="xoaSinhVien('${
                          sv.maSinhVien
                        }')">Xóa</button>      
                        <button class="btn btn-primary" onclick="chinhSua('${
                          sv.maSinhVien
                        }')"> chỉnh sửa </button>             
                    </td>
                </tr> 
        `;
  }
  //dom đến thẻ tbody gán innerHTML của tbody = noiDungTable
  document.querySelector("#tableSinhVien").innerHTML = noiDungTable;
  console.log(noiDungTable);
};

//GỌI HÀM LOAD NGAY KHI GD VỪA LOAD LÊN
loadDuLieuSinhVien();
//======================POST: THÊM MỚI DỮ LIỆU VÀO SERVER THÔNG QUA BACKEND
document.querySelector("#btnXacNhan").onclick = function () {
  var sv = new SinhVien();
  sv.maSinhVien = document.querySelector("#maSinhVien").value;
  sv.tenSinhVien = document.querySelector("#tenSinhVien").value;
  sv.email = document.querySelector("#email").value;
  sv.soDienThoai = document.querySelector("#soDienThoai").value;
  sv.loaiSinhVien = document.querySelector("#loaiSinhVien").value;
  sv.diemToan = document.querySelector("#diemToan").value;
  sv.diemLy = document.querySelector("#diemLy").value;
  sv.diemHoa = document.querySelector("#diemHoa").value;
  sv.diemRenLuyen = document.querySelector("#diemRenLuyen").value;
  console.log("sinh viên", sv);
  //bỏ qua bước kiểm tra dữ liệu đầu vào valida   tion
  //dùng axios đưa dữ liệu về server
  // var objectAjax = {
  //     url:'',
  //     method:''
  // }
  var promise = newService.themSinhVien();
  //Xử lý khi request thành công
  promise.then(function (result) {
    console.log("kết quả", result.data);
    loadDuLieuSinhVien();
  });
  promise.catch(function (err) {
    console.log("kết quả", err.response.data);
  });
};
//======================DELETE: XÓA DỮ LIỆU SERVER DỰA VÀO APId
var xoaSinhVien = function (maSinhVien) {
  alert(maSinhVien);
  //Gọi api
  var promise = newService.xoaSinhVien(xoaSinhVien);
  promise.then(function (result) {
    console.log(result.data);
    //gọi hàm api lấy thông tin từ dữ liệu 1 lần nữa sau khi xóa
    loadDuLieuSinhVien();
  });
  promise.catch(function (errorrrrrrrr) {
    console.log(errorrrrrrrr.response.data);
  });
};
//=======================================LẤY THÔNG TIN CÓ THAM SỐ
var chinhSua = function (sv) {
  var promise = newService.chinhSua(maSinhVien);

  promise.then(function (result) {
    console.log(result.data);
    //gọi hàm api lấy thông tin từ dữ liệu 1 lần nữa sau khi xóa
    var sv = result.data;
    //dom đến gd => gắn cho thẻ input
    document.querySelector("#maSinhVien").value = sv.maSinhVien;
    document.querySelector("#tenSinhVien").value = sv.tenSinhVien;
    document.querySelector("#soDienThoai").value = sv.soDienThoai;
    document.querySelector("#email").value = sv.email;
    document.querySelector("#loaiSinhVien").value = sv.loaiSinhVien;
    document.querySelector("#diemToan").value = sv.diemToan;
    document.querySelector("#diemLy").value = sv.diemLy;
    document.querySelector("#diemHoa").value = sv.diemHoa;
    document.querySelector("#diemRenLuyen").value = sv.diemRenLuyen;
  });
  promise.catch(function (errorrrrrrrr) {
    console.log(errorrrrrrrr);
  });
}
document.querySelector("#btnLuuThongTin").onclick = function () {
  var sv = new SinhVien();
  sv.maSinhVien = document.querySelector("#maSinhVien").value;
  sv.tenSinhVien = document.querySelector("#tenSinhVien").value;
  sv.email = document.querySelector("#email").value;
  sv.soDienThoai = document.querySelector("#soDienThoai").value;
  sv.loaiSinhVien = document.querySelector("#loaiSinhVien").value;
  sv.diemToan = document.querySelector("#diemToan").value;
  sv.diemLy = document.querySelector("#diemLy").value;
  sv.diemHoa = document.querySelector("#diemHoa").value;
  sv.diemRenLuyen = document.querySelector("#diemRenLuyen").value;
  var promise = axios({
    url:
      "http://svcy.myclass.vn/api/SinhVienApi/CapNhatThongTinSinhVien?maSinhVien=" +
      sv.maSinhVien,
    method: "PUT",
    data: sv,
  });
  promise.then(function (result) {
    console.log(result.data);
    //gọi hàm api lấy thông tin từ dữ liệu 1 lần nữa sau khi xóa
    loadDuLieuSinhVien();
  });
  promise.catch(function (errorrrrrrrr) {
    console.log(errorrrrrrrr.response.data);
  });
};
