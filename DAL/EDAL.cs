using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Diagnostics;
using DAL.Models;

namespace DAL
{
    public class EDAL : IDAL
    {
        private readonly Library _ctx = new Library();        

        public bool DBUserSaveCredentials(string fullName, string userName, string email, string password)
        {
            var number = _ctx.DBUsers.Count();

            if (!String.IsNullOrEmpty(fullName) && !String.IsNullOrEmpty(userName) && !String.IsNullOrEmpty(email) && !String.IsNullOrEmpty(password))
            {
                _ctx.DBUsers.Add(new Models.DBUser() { FullName = fullName, UserName=userName, Email=email, Password = password });
                _ctx.SaveChanges();               

                return _ctx.DBUsers.Count() > number;
            }

            return false;
        }


        public bool IsUserNameInDb(string userNameOrEmail)
        {
            bool IsUser = false;

            if (!String.IsNullOrEmpty(userNameOrEmail))
            {
                try
                {
                    if (userNameOrEmail.Contains('@'))
                    {
                        Models.DBUser user = _ctx.DBUsers.First(u => u.Email == userNameOrEmail);
                        IsUser = true;
                    }
                    else
                    {
                        Models.DBUser user = _ctx.DBUsers.First(u => u.UserName == userNameOrEmail);
                        IsUser = true;
                    }
                }
                catch (Exception)
                {
                }
            }
            return IsUser;
        }


        public bool IsUserNameInDb(string userNameOrEmail, string password)
        {
            bool IsUser = false;

            if (!String.IsNullOrEmpty(userNameOrEmail) && !String.IsNullOrEmpty(password))
            {
                try
                {
                    if (userNameOrEmail.Contains('@'))
                    {
                        Models.DBUser user = _ctx.DBUsers.First(u => u.Email == userNameOrEmail && u.Password == password);
                        IsUser = true;
                    }
                    else
                    {
                        Models.DBUser user = _ctx.DBUsers.First(u => u.UserName == userNameOrEmail && u.Password == password);
                        IsUser = true;
                    }
                }
                catch (Exception)
                {
                }
            }
            return IsUser;
        }
        

        public ICollection<DBPlace> GetDBPlacesByParams(string icon, string time, string rate)
        {
            int workingTime = Int32.Parse(time);
            int currentRate = Int32.Parse(rate);

            if (icon == "all")
            {
                return _ctx.DBPlaces.Where(p => p.OpenTime <= workingTime && p.CloseTime >= workingTime && p.Rate >= currentRate).ToList();
            }
           
            return _ctx.DBPlaces.Where(p => p.OpenTime <= workingTime && p.CloseTime >= workingTime && p.Icon == icon && p.Rate >= currentRate).ToList();
        }


        public ICollection<DBPlace> GetDBPlacesByAllParams(string icon, string openTime, string closeTime, string rate)
        {
            if (!String.IsNullOrEmpty(icon) && !String.IsNullOrEmpty(openTime) && !String.IsNullOrEmpty(closeTime) && !String.IsNullOrEmpty(rate))
            {
                int startTime = Int32.Parse(openTime);
                int finishTime = Int32.Parse(closeTime);
                int currentRate = Int32.Parse(rate);

                if (icon == "all")
                {
                    return _ctx.DBPlaces.Where(p => p.OpenTime <= startTime && p.CloseTime >= finishTime && p.Rate >= currentRate).ToList();
                }

                return _ctx.DBPlaces.Where(p => p.OpenTime <= startTime && p.CloseTime >= finishTime && p.Icon == icon && p.Rate >= currentRate).ToList();
            }

            return null;
        }        
    }
}
