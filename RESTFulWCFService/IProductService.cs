using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using System.ServiceModel.Web;
using System.IO;

namespace RESTFulWCFService
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IProductService" in both code and config file together.
    [ServiceContract]
    public interface IProductService
    {
        [OperationContract]
        [WebInvoke(Method = "GET",
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Wrapped,
            UriTemplate = "/RegisterDBUser/{fullName}/{userName}/{email}/{password}")]
        string RegisterDBUser(string fullName, string userName, string email, string password);

        [OperationContract]
        [WebInvoke(Method = "GET",
           ResponseFormat = WebMessageFormat.Json,
           BodyStyle = WebMessageBodyStyle.Wrapped,
           UriTemplate = "/IsUserNameInDb/{userNameOrEmail}")]
        string IsUserNameInDb(string userNameOrEmail);


        [OperationContract]
        [WebInvoke(Method = "GET",
          ResponseFormat = WebMessageFormat.Json,
          BodyStyle = WebMessageBodyStyle.Wrapped,
          UriTemplate = "/IsDBUserInDb/{userNameOrEmail}/{password}")]
        string IsDBUserInDb(string userNameOrEmail, string password);
        

        [OperationContract]
        [WebInvoke(Method = "GET",
           ResponseFormat = WebMessageFormat.Json,
           BodyStyle = WebMessageBodyStyle.Wrapped,
           UriTemplate = "/DBPlacesByParams/{icon}/{time}/{rate}")]
        ICollection<DBPlace> GetDBPlacesByParams(string icon, string time, string rate);


        [OperationContract]
        [WebInvoke(Method = "GET",
           ResponseFormat = WebMessageFormat.Json,
           BodyStyle = WebMessageBodyStyle.Wrapped,
           UriTemplate = "/DBPlacesByOneParam/{param}")]
        ICollection<DBPlace> GetDBPlacesByOneParam(string param);        
    }
}
