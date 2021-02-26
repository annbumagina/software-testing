package annbumagina.config;

import annbumagina.dao.UserJdbcDao;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;

@Configuration
public class SpringJdbcConfig {
    @Bean
    public UserJdbcDao usersJdbcDao(DataSource dataSource) {
        return new UserJdbcDao(dataSource);
    }

    @Bean
    public DataSource dataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("org.sqlite.JDBC");
        dataSource.setUrl("jdbc:sqlite:users.db");
        dataSource.setUsername("");
        dataSource.setPassword("");
        return dataSource;
    }
}