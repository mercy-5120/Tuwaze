-- Insert seed data for users table with actual passwords
INSERT INTO users (full_name, phone_number, email, gender, password_hash, role, ward, is_anonymous_allowed) VALUES
('Rajesh Kumar', '+91-9876543210', 'rajesh.kumar@example.com', 'Male', 'Rajesh@123', 'citizen', 'Ward 15', TRUE),
('Priya Sharma', '+91-8765432109', 'priya.sharma@example.com', 'Female', 'Priya@456', 'citizen', 'Ward 12', FALSE),
('Amit Patel', '+91-7654321098', 'amit.patel@example.com', 'Male', 'Amit@789', 'official', 'Ward 8', FALSE),
('Sneha Reddy', '+91-6543210987', 'sneha.reddy@example.com', 'Female', 'Sneha@321', 'moderator', 'Ward 5', TRUE),
('Vikram Singh', '+91-9432109876', 'vikram.singh@example.com', 'Male', 'Vikram@654', 'legal_aid', 'Ward 3', FALSE),
('Ananya Desai', '+91-8321098765', 'ananya.desai@example.com', 'Female', 'Ananya@987', 'citizen', 'Ward 10', TRUE),
('Rahul Mehta', '+91-7210987654', 'rahul.mehta@example.com', 'Male', 'Rahul@234', 'citizen', 'Ward 7', FALSE),
('Neha Gupta', '+91-6109876543', 'neha.gupta@example.com', 'Female', 'Neha@567', 'official', 'Ward 9', TRUE),
('Sanjay Verma', '+91-5098765432', 'sanjay.verma@example.com', 'Male', 'Sanjay@890', 'moderator', 'Ward 14', FALSE),
('Pooja Nair', '+91-4987654321', 'pooja.nair@example.com', 'Female', 'Pooja@432', 'legal_aid', 'Ward 6', TRUE),
('Arun Joshi', '+91-3876543210', 'arun.joshi@example.com', 'Male', 'Arun@765', 'citizen', 'Ward 11', FALSE),
('Meera Iyer', '+91-2765432109', 'meera.iyer@example.com', 'Female', 'Meera@098', 'citizen', 'Ward 4', TRUE),
('Karthik Malhotra', '+91-1654321098', 'karthik.malhotra@example.com', 'Male', 'Karthik@543', 'official', 'Ward 13', FALSE),
('Divya Choudhary', '+91-9543210987', 'divya.choudhary@example.com', 'Female', 'Divya@876', 'moderator', 'Ward 2', TRUE),
('Mohan Das', '+91-8432109876', 'mohan.das@example.com', 'Male', 'Mohan@219', 'legal_aid', 'Ward 1', FALSE);