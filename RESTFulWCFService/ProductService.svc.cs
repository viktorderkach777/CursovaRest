using DAL;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using System.Security.Cryptography;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.Text;
using System.Web;
using System.Xml.Linq;

namespace RESTFulWCFService
{
    [AspNetCompatibilityRequirements(RequirementsMode
       = AspNetCompatibilityRequirementsMode.Allowed)]
    public class ProductService : IProductService
    {

        public static string CryptoHelper(string data, string salt)
        {
            byte[] dataByte = Encoding.ASCII.GetBytes(data + salt); 
            byte[] hash = MD5.Create().ComputeHash(dataByte);
            return BitConverter.ToString(hash).Replace("-", "");
        }


        private readonly IDAL _dal = new EDAL();        


        public string RegisterDBUser(string fullName, string userName, string email, string password)
        {
            HttpContext.Current.Response.SetCookie(
                new HttpCookie("hash", CryptoHelper("passw", "salt")));

            return _dal.DBUserSaveCredentials(fullName, userName, email, password).ToString();
        }


        public string IsUserNameInDb(string userNameOrEmail)
        {
            HttpContext.Current.Response.SetCookie(
               new HttpCookie("hash", CryptoHelper("passw", "salt")));
            var cook = new HttpCookie("hash2", CryptoHelper("passx", "salt"))
            {
                Expires = new DateTime(2019, 2, 10)
            };
            HttpContext.Current.Response.SetCookie(cook);
            return _dal.IsUserNameInDb(userNameOrEmail).ToString();
        }


        public string IsDBUserInDb(string userNameOrEmail, string password)
        {
            return _dal.IsUserNameInDb(userNameOrEmail, password).ToString();
        }
        

        public ICollection<DBPlace> GetDBPlacesByParams(string icon, string time, string rate)
        {
            if (!String.IsNullOrEmpty(icon) && !String.IsNullOrEmpty(time) && !String.IsNullOrEmpty(rate))
            {
                var places = _dal.GetDBPlacesByParams(icon, time, rate);
                var wcfPlaces = places.Select(p =>
                new DBPlace
                {
                    Id = p.Id,
                    Name = p.Name,
                    LinkRef = p.LinkRef,
                    LinkText = p.LinkText,
                    AboutPlace = p.AboutPlace,
                    OpenTime = p.OpenTime,
                    CloseTime = p.CloseTime,
                    Rate = p.Rate,
                    Icon = p.Icon,
                    Longitude = p.Longitude,
                    Latitude = p.Latitude
                });

                return wcfPlaces.ToArray();
            }
            return null;
        }


        public ICollection<DBPlace> GetDBPlacesByOneParam(string param)
        {
            if (!String.IsNullOrEmpty(param))
            {
                var filterDic = param.Split('_').Select(f => new { key = f.Split('=').First(), value = f.Split('=').Last() });

                Dictionary<string, string> elems = new Dictionary<string, string>();

                foreach (var item in filterDic)
                {
                    foreach (var name in typeof(DBPlace).GetProperties())
                    {                       
                        if (name.Name == item.key)
                        {                           
                            elems.Add(item.key, item.value);
                        }
                    }
                }

                if (!String.IsNullOrEmpty(elems["Icon"]) && !String.IsNullOrEmpty(elems["OpenTime"]) && !String.IsNullOrEmpty(elems["CloseTime"]) && !String.IsNullOrEmpty(elems["Rate"]))
                {
                    var places = _dal.GetDBPlacesByAllParams(elems["Icon"], elems["OpenTime"], elems["CloseTime"], elems["Rate"]);
                    var wcfPlaces = places.Select(p =>
                    new DBPlace
                    {
                        Id = p.Id,
                        Name = p.Name,
                        LinkRef = p.LinkRef,
                        LinkText = p.LinkText,
                        AboutPlace = p.AboutPlace,
                        OpenTime = p.OpenTime,
                        CloseTime = p.CloseTime,
                        Rate = p.Rate,
                        Icon = p.Icon,
                        Longitude = p.Longitude,
                        Latitude = p.Latitude
                    });

                    return wcfPlaces.ToArray();
                }
            }
            return null;           
        }
    }
}
