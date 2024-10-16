import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../model/emp';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort'; // Import MatSort

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements AfterViewInit {

  employeForm: FormGroup = new FormGroup({});
  employeObj: Employee = new Employee();
  selectedSort: string = '';
  searchValue: string = '';
  employeeList: Employee[] = [];
  dataSource = new MatTableDataSource<Employee>(this.employeeList);
  editingIndex: number | null = null;

  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort; // Declare MatSort

  constructor(private dialog: MatDialog) {
    this.createForm();

    if (this.isLocalStorageAvailable()) {
      const oldData = localStorage.getItem("empData");
      if (oldData != null) {
        this.employeeList = JSON.parse(oldData);
        this.dataSource.data = this.employeeList;
      }
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; // Assign MatSort to the dataSource
    this.updateDataSource();
  }

  createForm() {
    this.employeForm = new FormGroup({
      Id: new FormControl(null),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      role: new FormControl('', Validators.required),
    });
  }

  saveData() {
    if (this.employeForm.invalid) {
      this.employeForm.markAllAsTouched();
      return;
    }

    if (this.editingIndex === null) {
      const oldData = localStorage.getItem("empData");
      this.employeeList = oldData ? JSON.parse(oldData) : [];
      this.employeForm.controls['Id'].setValue(this.employeeList.length + 1);
      this.employeeList.unshift(this.employeForm.value);
    } else {
      this.employeeList[this.editingIndex] = this.employeForm.value;
      this.editingIndex = null;
    }

    localStorage.setItem("empData", JSON.stringify(this.employeeList));
    this.employeForm.reset();
    this.updateDataSource();
  }

  editData(employee: Employee) {
    this.employeForm.patchValue(employee);
    this.editingIndex = this.employeeList.indexOf(employee);
  }

  removeData(index: number) {
    this.employeeList.splice(index, 1);
    localStorage.setItem("empData", JSON.stringify(this.employeeList));
    this.updateDataSource();
  }

  isLocalStorageAvailable(): boolean {
    return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
  }

  sortBySelectedOption() {
    this.dataSource.data = this.employeeList; // Reset the data to the full list
    if (this.selectedSort === 'name') {
      this.dataSource.data.sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.selectedSort === 'email') {
      this.dataSource.data.sort((a, b) => a.email.localeCompare(b.email));
    }
    // this.updateDataSource(); // Update the data source after sorting
  }

  search() {
    const searchValue = this.searchValue.trim().toLowerCase();
    if (searchValue) {
      this.dataSource.data = this.employeeList.filter(employee =>
        employee.name.toLowerCase().includes(searchValue) ||
        employee.email.toLowerCase().includes(searchValue)
      );
    } else {
      this.dataSource.data = this.employeeList; // Reset to full list if search is empty
    }
    this.dataSource.paginator?.firstPage(); // Reset paginator to the first page after search
    // this.updateDataSource(); // Update displayed data
  }

  updateDataSource() {
    this.dataSource.data = this.employeeList; // Set the data for the paginator
    this.dataSource.paginator = this.paginator; // Assign paginator to the data source
    this.dataSource.sort = this.sort; // Assign MatSort to the data source
  }

}
