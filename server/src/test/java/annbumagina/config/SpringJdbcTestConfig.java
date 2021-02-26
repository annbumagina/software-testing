package annbumagina.config;

import annbumagina.dao.UserJdbcDao;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.Profile;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.testcontainers.containers.MySQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import javax.sql.DataSource;

@Testcontainers
@TestConfiguration
@Profile("test")
public class SpringJdbcTestConfig {
    @Container
    private static final MySQLContainer<?> MY_SQL_CONTAINER = new MySQLContainer<>("mysql:5.5");

    @Lazy
    @Bean
    public UserJdbcDao testUsersJdbcDao(DataSource dataSource) {
        return new UserJdbcDao(dataSource);
    }

    @Lazy
    @Bean
    public DataSource testDataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName(MY_SQL_CONTAINER.getDriverClassName());
        dataSource.setUrl(MY_SQL_CONTAINER.getJdbcUrl());
        dataSource.setUsername(MY_SQL_CONTAINER.getUsername());
        dataSource.setPassword(MY_SQL_CONTAINER.getPassword());
        return dataSource;
    }
}