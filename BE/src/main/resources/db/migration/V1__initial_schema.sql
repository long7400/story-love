-- Initial schema for Love Story application

-- Roles table
CREATE TABLE roles
(
    id   SERIAL PRIMARY KEY,
    name VARCHAR(20) NOT NULL UNIQUE
);

-- Insert default roles
INSERT INTO roles (name)
VALUES ('ROLE_USER');
INSERT INTO roles (name)
VALUES ('ROLE_ADMIN');
INSERT INTO roles (name)
VALUES ('ROLE_PARTNER');

-- Users table
CREATE TABLE users
(
    id         SERIAL PRIMARY KEY,
    username   VARCHAR(50)  NOT NULL UNIQUE,
    email      VARCHAR(50) UNIQUE,
    gender      VARCHAR(50),
    password   VARCHAR(120) NOT NULL,
    activated  BOOLEAN   DEFAULT FALSE, -- Thêm cột 'activated'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- User roles junction table
CREATE TABLE user_roles
(
    user_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles (id) ON DELETE CASCADE
);

-- Relationships table
CREATE TABLE relationships
(
    id                  SERIAL PRIMARY KEY,
    start_date          DATE NOT NULL,
    title               VARCHAR(255),
    description         TEXT,
    anniversary_message TEXT,
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Profiles table
CREATE TABLE profiles
(
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(100) NOT NULL,
    birthday        DATE,
    avatar_url      VARCHAR(255),
    bio             TEXT,
    favorite_quote  TEXT,
    relationship_id BIGINT,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (relationship_id) REFERENCES relationships (id)
);

-- Events table
CREATE TABLE events
(
    id                SERIAL PRIMARY KEY,
    title             VARCHAR(255) NOT NULL,
    date              DATE         NOT NULL,
    short_description VARCHAR(1000),
    full_description  TEXT,
    image_url         VARCHAR(255),
    html_enabled      BOOLEAN   DEFAULT FALSE,
    relationship_id   BIGINT       NOT NULL,
    created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (relationship_id) REFERENCES relationships (id)
);

-- Photos table
CREATE TABLE photos
(
    id              SERIAL PRIMARY KEY,
    title           VARCHAR(255) NOT NULL,
    date            DATE,
    description     TEXT,
    image_url       VARCHAR(255) NOT NULL,
    location        VARCHAR(255),
    tags            VARCHAR(255),
    html_enabled    BOOLEAN   DEFAULT FALSE,
    relationship_id BIGINT       NOT NULL,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (relationship_id) REFERENCES relationships (id)
);

-- Location markers table
CREATE TABLE location_markers
(
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(255)     NOT NULL,
    description     TEXT,
    date            DATE,
    latitude        DOUBLE PRECISION NOT NULL,
    longitude       DOUBLE PRECISION NOT NULL,
    is_special      BOOLEAN   DEFAULT FALSE,
    image_url       VARCHAR(255),
    relationship_id BIGINT           NOT NULL,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (relationship_id) REFERENCES relationships (id)
);

-- Postcards table
CREATE TABLE postcards
(
    id               SERIAL PRIMARY KEY,
    title            VARCHAR(255) NOT NULL,
    message          TEXT,
    image_url        VARCHAR(255),
    background_color VARCHAR(50),
    font_family      VARCHAR(100),
    from_name        VARCHAR(100),
    to_name          VARCHAR(100),
    created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    delivered_at     TIMESTAMP,
    html_enabled     BOOLEAN   DEFAULT FALSE,
    relationship_id  BIGINT       NOT NULL,
    user_id          BIGINT,
    FOREIGN KEY (relationship_id) REFERENCES relationships (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

-- Countdown table
CREATE TABLE countdowns
(
    id               SERIAL PRIMARY KEY,
    title            VARCHAR(255) NOT NULL,
    target_date      TIMESTAMP    NOT NULL,
    description      TEXT,
    image_url        VARCHAR(255),
    background_color VARCHAR(50),
    font_color       VARCHAR(50),
    relationship_id  BIGINT       NOT NULL,
    created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (relationship_id) REFERENCES relationships (id)
);

-- Default admin user will be created by the application on first run
-- using environment variables for secure credentials
-- See AdminInitializer.java for implementation
