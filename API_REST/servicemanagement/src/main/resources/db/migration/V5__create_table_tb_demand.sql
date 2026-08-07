CREATE TABLE tb_demand(
    id SERIAL PRIMARY KEY,
    description TEXT,
    amount INT,
    product_type_id BIGINT,
    demand_group_id BIGINT,
    product_length DOUBLE PRECISION,
    product_height DOUBLE PRECISION,
    value DOUBLE PRECISION,
    created TIMESTAMP,
    updated TIMESTAMP,
    CONSTRAINT fk_product_type FOREIGN KEY (product_type_id) REFERENCES tb_product_type(id),
    CONSTRAINT fk_demand_group FOREIGN KEY (demand_group_id) REFERENCES tb_demand_group(id)
)