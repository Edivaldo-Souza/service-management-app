CREATE TABLE tb_customer (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(255),
    user_id BIGINT NOT NULL,

    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES tb_user(id)
)