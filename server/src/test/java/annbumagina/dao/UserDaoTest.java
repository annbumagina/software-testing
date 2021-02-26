package annbumagina.dao;

import annbumagina.config.SpringJdbcTestConfig;
import annbumagina.model.User;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@ContextConfiguration(classes = SpringJdbcTestConfig.class)
@ActiveProfiles("test")
public class UserDaoTest {

    @Autowired
    private UserDao userDao;

    @Test
    void testAddUser() {
        User user = new User("ann", "123");
        assertFalse(userDao.checkUser(user));
        assertTrue(userDao.addUser(user));
        assertTrue(userDao.checkUser(user));
    }
}
