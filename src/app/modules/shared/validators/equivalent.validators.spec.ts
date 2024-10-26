import { FormControl, FormGroup } from "@angular/forms";
import { equivalentValidators } from "./equivalent.validators";

describe("equivalentValidators", () => {
  let formGroup: FormGroup;

  beforeEach(() => {
    formGroup = new FormGroup(
      {
        password: new FormControl(null),
        confirmPassword: new FormControl(null),
      },
      { validators: equivalentValidators("password", "confirmPassword") }
    );
  });

  it("should not set an error if passwords are equal", () => {
    // Arrange
    formGroup.get("password")?.setValue("password123");
    formGroup.get("confirmPassword")?.setValue("password123");

    // Act
    formGroup.updateValueAndValidity();

    // Assert
    expect(formGroup.get("confirmPassword")?.errors).toBeNull();
  });

  it("should set an error if passwords are not equal", () => {
    // Arrange
    formGroup.get("password")?.setValue("password123");
    formGroup.get("confirmPassword")?.setValue("differentPassword");

    // Act
    formGroup.updateValueAndValidity();

    // Assert
    expect(formGroup.get("confirmPassword")?.errors).toEqual({
      passwordsNotEqual: true,
    });
  });

  it("should not set an error if confirmPassword is empty", () => {
    // Arrange
    formGroup.get("password")?.setValue("password123");
    formGroup.get("confirmPassword")?.setValue("");

    // Act
    formGroup.updateValueAndValidity();

    // Assert
    expect(formGroup.get("confirmPassword")?.errors).toBeNull();
  });
});
