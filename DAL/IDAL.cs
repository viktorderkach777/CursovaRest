using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public interface IDAL
    {
        ICollection<DBPlace> GetDBPlacesByParams(string icon, string time, string rate);
        ICollection<DBPlace> GetDBPlacesByAllParams(string icon, string openTime, string closeTime, string rate);       

        bool DBUserSaveCredentials(string fullName, string userName, string email, string password);
        bool IsUserNameInDb(string userNameOrEmail);
        bool IsUserNameInDb(string userNameOrEmail, string password);
    }
}
