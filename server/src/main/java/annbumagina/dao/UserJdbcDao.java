package annbumagina.dao;

import annbumagina.model.User;
import org.springframework.jdbc.core.support.JdbcDaoSupport;

import javax.sql.DataSource;

public class UserJdbcDao extends JdbcDaoSupport implements UserDao {
    public UserJdbcDao(DataSource dataSource) {
        super();
        setDataSource(dataSource);
        createTable();
    }

    private void createTable() {
        String sqlCreate = "CREATE TABLE IF NOT EXISTS USERS"
                + "  (LOGIN           VARCHAR(30),"
                + "   PASS            VARCHAR(30))";

        getJdbcTemplate().execute(sqlCreate);
    }

    @Override
    public boolean addUser(User user) {
        if (!loginExists(user)) {
            String sql = "INSERT INTO USERS (LOGIN, PASS) VALUES (?, ?)";
            int cnt = getJdbcTemplate().update(sql, user.getLogin(), user.getPassword());
            return cnt > 0;
        }
        return false;
    }

    @Override
    public boolean checkUser(User user) {
        String sql = "SELECT COUNT(*) FROM USERS WHERE LOGIN = '" + user.getLogin() + "' AND PASS = '" + user.getPassword() + "'";
        Integer cnt = getJdbcTemplate().queryForObject(sql, Integer.class);
        return cnt > 0;
    }

    private boolean loginExists(User user) {
        String sql = "SELECT COUNT(*) FROM USERS WHERE LOGIN = '" + user.getLogin() + "'";
        Integer cnt = getJdbcTemplate().queryForObject(sql, Integer.class);
        return cnt > 0;
    }
}
