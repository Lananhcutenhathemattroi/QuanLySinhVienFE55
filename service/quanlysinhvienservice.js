//service là nơi  chứa các phương thức tương tác vs backend
var quanLySinhVienService = function(){
    this.layThongTinSinhVien = function(){
        var promise = axios ({
            url: 'http://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien',
            method:'GET'
        });
        return promise;
    }
    this.xoaSinhVien = function(maSinhVien){
        var promise = axios({
            url:
              "http://svcy.myclass.vn/api/SinhVienApi/XoaSinhVien?maSinhVien=" +
              maSinhVien,
            method: "DELETE",
          });

        return promise;
    }
    this.chinhSua = function(sv){
        var promise = axios({
            url:
              "http://svcy.myclass.vn/api/SinhVienApi/LayThongTinSinhVien?maSinhVien=" +
              maSinhVien,
            method: "GET",
            data: sv
          });
          return promise;
    }
    this.themSinhVien = function(){
        var promise = axios({
            url: "http://svcy.myclass.vn/api/SinhVienApi/ThemSinhVien",
            method: "POST",
            data: sv, //dữ liệu backend yc (lưu ý phải định dạng backend cần có thể là object hoặc aray , phải viết đúng thuộc tính phân biệt hoa thường)
          });
    }
}