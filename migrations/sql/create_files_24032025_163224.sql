-- Enable UUID extension if not already enabled
-- Note: In MySQL, UUIDs are handled differently and do not require an extension.

-- Drop table if it exists
-- DROP TABLE IF EXISTS files;

CREATE TABLE IF NOT EXISTS files (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    filename VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    size BIGINT NOT NULL,
    path VARCHAR(500) NOT NULL,
    created_by INT NOT NULL,
    is_public BOOLEAN NOT NULL DEFAULT false,
    status BOOLEAN NOT NULL DEFAULT true,
    is_deleted BOOLEAN NOT NULL DEFAULT false,
    created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
);