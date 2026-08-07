CREATE TABLE tb_demand_group(
    id SERIAL PRIMARY KEY,
    customer_id BIGINT,
    created TIMESTAMP,
    updated TIMESTAMP,
    closed TIMESTAMP,

    CONSTRAINT fk_customer FOREIGN KEY (customer_id) REFERENCES tb_customer(id)
)