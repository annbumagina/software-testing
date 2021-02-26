package annbumagina.dao;

import annbumagina.model.User;

public interface UserDao {
    boolean addUser(User user);
    boolean checkUser(User user);
}
