package annbumagina.controller;

import annbumagina.dao.UserDao;
import annbumagina.model.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller

public class UserController {
    private UserDao userDao;
    private User user;

    public UserController(UserDao userDao) {
        this.userDao = userDao;
    }

    @ResponseBody
    @RequestMapping(value = "/login")
    public String login(@RequestParam String login, @RequestParam String pass) {
        User user = new User(login, pass);
        if (userDao.checkUser(user)) {
            this.user = user;
            return "OK";
        }
        return "User does not exist";
    }

    @ResponseBody
    @RequestMapping(value = "/register")
    public String register(@RequestParam String login, @RequestParam String pass) {
        User user = new User(login, pass);
        if (userDao.addUser(user)) {
            return "Successfully registered";
        }
        return "Login already exists";
    }
}
