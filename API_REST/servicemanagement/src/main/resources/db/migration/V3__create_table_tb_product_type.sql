CREATE TABLE tb_product_type(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    is_outsourced BOOLEAN,
    value DOUBLE PRECISION
)