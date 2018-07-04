'use strick';

module.exports = function (app) {
  const User = app.models.User;
  const Role = app.models.Role;
  const RoleMapping = app.models.RoleMapping;
  const userData = {
    username: "admin",
    email: 'admin@example.com',
    password: '*1234#'
  };

  const roleData = {
    name: 'admin'
  };

  User.find({ where: { username: 'admin' } }, function (error, user) {
    if (user.length) {
      return false;
    }

    User.create(userData, function (error, user) {
      if (error) {
        throw error;
      }

      console.log(user);

      Role.create(roleData, function (error, role) {
        if (error) {
          throw error;
        }

        console.log(role);

        role.principals.create({
          principalType: RoleMapping.USER,
          principalId: user.id
        }, function (error, principal) {
          if (error) {
            throw error;
          }

          console.log(principal);
        });
      });
    });
  });
};