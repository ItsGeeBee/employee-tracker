
INSERT INTO department(name)
VALUES
    ("Sales"),
    ("Engineer"),
    ("Finance"),
    ("Legal");

INSERT INTO role(title, salary, department_id)
VALUES
    ("Sales Lead", 100000, 1),
    ("Salesperson", 80000, 1),
    ("Lead Engineer", 150000, 2),
    ("Software Engineer", 120000, 2),
    ("Accountant", 120000, 3),
    ("Legal Team Lead", 250000, 4),
    ("Lawyer", 190000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
    ("Mark", "Roberts", 1, NULL),
    ("Rhonda", "Lee", 2, 1),
    ("Elise", "Maree", 3, NULL),
    ("Greg", "Lawence", 4, 3),
    ("Jam", "Louise", 5, NULL),
    ("Steph", "Hamburger", 6, NULL),
    ("MJ", "Ak", 7, 6);