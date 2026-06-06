CREATE TABLE t_p67313243_sound_catalog_projec.users (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    email       VARCHAR(255) NOT NULL UNIQUE,
    phone       VARCHAR(50),
    avatar_url  TEXT,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO t_p67313243_sound_catalog_projec.users (name, email, phone) VALUES
    ('Алексей Новиков', 'alexey@email.com', '+7 (999) 000-00-00'),
    ('Мария Иванова', 'maria@email.com', '+7 (999) 111-11-11'),
    ('Дмитрий Козлов', 'dmitry@email.com', NULL);
