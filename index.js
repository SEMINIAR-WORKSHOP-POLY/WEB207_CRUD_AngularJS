var app = angular.module("myModule", []);
app.controller("myController", function ($scope, $http) {
  $scope.listSinhVien = [];
  $scope.viTriUpdate = -1;
  $scope.form_sinhVien = {
    ten: "",
    tuoi: 0,
    gioiTinh: false,
    chuyenNganh: "udpm",
  };

  let url = "http://localhost:3000/sinhVien";
  // GET => Hien Thi Table
  $http.get(url).then(function (response) {
    $scope.listSinhVien = response.data;
  });

  // Remove
  $scope.removeSinhVien = function (event, index) {
    event.preventDefault();
    let sv = $scope.listSinhVien[index];
    let api = url + "/" + sv.id;
    $http.delete(api).then(function () {
      $scope.listSinhVien.splice(index, 1);
      alert("Xoa thanh cong");
    });
  };
  // Detail
  $scope.detailSinhVien = function (event, index) {
    event.preventDefault();
    let sv = $scope.listSinhVien[index];
    $scope.form_sinhVien.ten = sv.ten;
    $scope.form_sinhVien.tuoi = sv.tuoi;
    $scope.form_sinhVien.gioiTinh = sv.gioiTinh;
    $scope.form_sinhVien.chuyenNganh = sv.chuyenNganh;
    $scope.viTriUpdate = index;
  };

  // update
  $scope.updateSinhVien = function (event) {
    event.preventDefault();
    if ($scope.viTriUpdate === -1) {
      alert("Vui long chon dong muon update");
    }
    let sv = $scope.listSinhVien[$scope.viTriUpdate];
    let api = url + "/" + sv.id;
    $http.put(api, $scope.form_sinhVien).then(function (response) {
      $scope.listSinhVien[$scope.viTriUpdate] = response.data;
    });
  };

  // add
  $scope.addSinhVien = function (event) {
    event.preventDefault();
    $http.post(url, $scope.form_sinhVien).then(function (response) {
      if (response.status === 201) {
        $scope.listSinhVien.push($scope.form_sinhVien);
      }
    });
  };
});
