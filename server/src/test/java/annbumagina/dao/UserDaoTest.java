package annbumagina.dao;

import annbumagina.model.User;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.testcontainers.containers.MySQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import static org.junit.jupiter.api.Assertions.*;

@Testcontainers
@ExtendWith(SpringExtension.class)
public class UserDaoTest {

    @Container
    private static final MySQLContainer<?> MY_SQL_CONTAINER = new MySQLContainer<>("mysql:5.5");

    private static UserDao userDao;

    @BeforeAll
    public static void testDataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName(MY_SQL_CONTAINER.getDriverClassName());
        dataSource.setUrl(MY_SQL_CONTAINER.getJdbcUrl());
        dataSource.setUsername(MY_SQL_CONTAINER.getUsername());
        dataSource.setPassword(MY_SQL_CONTAINER.getPassword());
        userDao = new UserJdbcDao(dataSource);
    }

    @Test
    void testAddUser() {
        User user = new User("ann", "123");
        assertFalse(userDao.checkUser(user));
        assertTrue(userDao.addUser(user));
        assertTrue(userDao.checkUser(user));
    }

    @Test
    void testAddExistedUser() {
        User user = new User("mike", "321");
        assertTrue(userDao.addUser(user));
        assertTrue(userDao.checkUser(user));
        assertFalse(userDao.addUser(user));
    }
}
