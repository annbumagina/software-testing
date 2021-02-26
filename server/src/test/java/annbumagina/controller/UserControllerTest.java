package annbumagina.controller;

import annbumagina.dao.UserDao;
import annbumagina.model.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.containsString;
import static org.mockito.AdditionalMatchers.not;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserDao userDao;

    @Test
    public void loginGood() throws Exception {
        User user = new User("ann", "123");
        when(userDao.checkUser(user)).thenReturn(true);

        this.mockMvc.perform(get("/login?login=ann&pass=123")).andExpect(status().isOk())
                .andExpect(content().string(containsString("OK")));
    }

    @Test
    public void loginBad() throws Exception {
        User user = new User("ann", "123");
        when(userDao.checkUser(not(eq(user)))).thenReturn(false);

        this.mockMvc.perform(get("/login?login=mike&pass=123")).andExpect(status().isOk())
                .andExpect(content().string(containsString("User does not exist")));
    }

    @Test
    public void registerGood() throws Exception {
        User user = new User("ann", "123");
        when(userDao.addUser(user)).thenReturn(true);

        this.mockMvc.perform(get("/register?login=ann&pass=123")).andExpect(status().isOk())
                .andExpect(content().string(containsString("Successfully registered")));
    }

    @Test
    public void registerBad() throws Exception {
        User user = new User("ann", "123");
        when(userDao.addUser(not(eq(user)))).thenReturn(false);

        this.mockMvc.perform(get("/register?login=mike&pass=123")).andExpect(status().isOk())
                .andExpect(content().string(containsString("Login already exists")));
    }
}
