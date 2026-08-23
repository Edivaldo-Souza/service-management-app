CREATE TABLE tb_file(
    id SERIAL PRIMARY KEY,
    user_id BIGINT,
    name VARCHAR(255),
    type VARCHAR(255),

    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES tb_user(id)
)