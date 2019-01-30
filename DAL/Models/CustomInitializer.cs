using DAL.Models;
using System.Data.Entity;

namespace DAL
{
    public class CustomInitializer<T> : DropCreateDatabaseAlways<Library>
    {
        protected override void Seed(Library context)
        {
            context.DBPlaces.Add(
                new DBPlace
                {
                    Name = "Рівненський обласний академічний український музично-драматичний театр",
                    LinkRef = "<a href =\"http://dramteatr.com.ua/\" target=\"_blank\" title=\"Opens in a new window\">",
                    LinkText = "Рівненський обласний академічний український музично-драматичний театр",
                    AboutPlace = "  — головна театральна сцена Рівненщини.",
                    OpenTime = 12,
                    CloseTime = 18,
                    Rate = 5,
                    Icon = "theatre",
                    Longitude = 26.246115,
                    Latitude = 50.620914
                });

            context.DBPlaces.Add(
               new DBPlace
               {
                   Name = "Рівненський обласний академічний ляльковий театр",
                   LinkRef = "<a href =\"http://www.teatr.rv.ua/\" target=\"_blank\" title=\"Opens in a new window\">",
                   LinkText = "Дитячий ляльковий театр",
                   AboutPlace = "  — обласний академічний ляльковий театр у місті Рівному.",
                   OpenTime = 8,
                   CloseTime = 11,
                   Rate = 5,
                   Icon = "theatre",
                   Longitude = 26.2484742,
                   Latitude = 50.623080
               });

            context.DBPlaces.Add(
               new DBPlace
               {
                   Name = "Молодіжний експериментальний театр Рівного \"МЕТР\"",
                   LinkRef = "<a href =\"https://metr-ua.livejournal.com/\" target=\"_blank\" title=\"Opens in a new window\">",
                   LinkText = "Молодіжний експериментальний театр Рівного \"МЕТР\"",
                   AboutPlace = " — займається організацією мистецьких акцій, виставок, перфомансів, фестивалів. ",
                   OpenTime = 9,
                   CloseTime = 14,
                   Rate = 3,
                   Icon = "theatre",
                   Longitude = 26.259594,
                   Latitude = 50.618328
               });

            context.DBPlaces.Add(
              new DBPlace
              {
                  Name = "Театр оригінального жанру \"Галатея\"",
                  LinkRef = "<a href=\"http://mpkrivne.com.ua/groups/7-galateja\" target=\"_blank\" title=\"Opens in a new window\">",
                  LinkText = "Театр оригінального жанру \"Галатея\"",
                  AboutPlace = " — народний аматорський театр живих скульптур. ",
                  OpenTime = 10,
                  CloseTime = 17,
                  Rate = 2,
                  Icon = "theatre",
                  Longitude = 26.266270,
                  Latitude = 50.626928
              });

            context.DBPlaces.Add(
             new DBPlace
             {
                 Name = "Театр музичної казки \"Диво\"",
                 LinkRef = "<a href =\"http://teatrdivo.org/\" target=\"_blank\" title=\"Opens in a new window\">",
                 LinkText = "Театр музичної казки \"Диво\"",
                 AboutPlace = " — приватний театр на колесах, у якому дорослі грають для дітей. ",
                 OpenTime = 12,
                 CloseTime = 18,
                 Rate = 4,
                 Icon = "theatre",
                 Longitude = 26.279442,
                 Latitude = 50.611429
             });

            context.DBPlaces.Add(
            new DBPlace
            {
                Name = "Театр-студія \"Від ліхтаря\"",
                LinkRef = "<a href=\"http://www.pdm.org.ua/special-centers/teatr-studia/teatr-pelagogy\" target=\"_blank\" title=\"Opens in a new window\">",
                LinkText = "Театр-студія \"Від ліхтаря\"",
                AboutPlace = " — один із найкращих молодіжних театрів міста. ",
                OpenTime = 10,
                CloseTime = 17,
                Rate = 4,
                Icon = "theatre",
                Longitude = 26.264304,
                Latitude = 50.621184
            });

            context.DBPlaces.Add(
            new DBPlace
            {
                Name = "Театр \"Сонях\"",
                LinkRef = " <a href =\"https://www.facebook.com/teatrs.com.ua\" target=\"_blank\" title=\"Opens in a new window\">",
                LinkText = "Театр \"Сонях\"",
                AboutPlace = " — один із самодіяльних народних театрів міста. ",
                OpenTime = 11,
                CloseTime = 16,
                Rate = 3,
                Icon = "theatre",
                Longitude = 26.268902,
                Latitude = 50.632702
            });

           context.DBPlaces.Add(
           new DBPlace
           {
               Name = "Літературний музей Уласа Самчука",
               LinkRef = "<a href=\"http://museum.rv.gov.ua/vistavka-literaturnij-muzej-ulasa-samchuka/\" target=\"_blank\" title=\"Opens in a new window\">",
               LinkText = "Літературний музей Уласа Самчука",
               AboutPlace = " — музей в залі будинку вчених. ",
               OpenTime = 09,
               CloseTime = 17,
               Rate = 4,
               Icon = "museum",
               Longitude = 26.248911,
               Latitude = 50.623039
           });

          context.DBPlaces.Add(
          new DBPlace
          {
              Name = "Рівненський обласний краєзнавчий музей",
              LinkRef = "<a href=\"http://museum.rv.gov.ua/\" target=\"_blank\" title=\"Opens in a new window\">",
              LinkText = "Рівненський обласний краєзнавчий музей",
              AboutPlace = " —  головне зібрання матеріалів і предметів матеріальної та духовної культури Рівненщини. ",
              OpenTime = 8,
              CloseTime = 18,
              Rate = 5,
              Icon = "museum",
              Longitude = 26.247997,
              Latitude = 50.615418
          });


         context.DBPlaces.Add(
         new DBPlace
         {
             Name = "Музей бурштину",
             LinkRef = "<a href=\"http://museum.rv.gov.ua/struktura-muzeyu/vistavka-muzej-burshtinu/\" target=\"_blank\" title=\"Opens in a new window\">",
             LinkText = "Музей бурштину",
             AboutPlace = " —  єдиний в Україні музей бурштину. ",
             OpenTime = 10,
             CloseTime = 17,
             Rate = 5,
             Icon = "museum",
             Longitude = 26.309148,
             Latitude = 50.612702
         });


            context.DBPlaces.Add(
        new DBPlace
        {
            Name = "Музей бойової слави 13-го Армійського корпусу",
            LinkRef = "<a href=\"https://geo.viaregia.org/testbed/index.pl?rm=obj&objid=12794\" target=\"_blank\" title=\"Opens in a new window\">",
            LinkText = "Музей бойової слави 13-го Армійського корпусу",
            AboutPlace = " — музей присвячено історії 13 армійськоого корпусу. Тут можна дізнатися про подробиці Великої Вітчизняної війни, про визволення Рівного, про партизанський рух у цьому регіоні. ",
            OpenTime = 10,
            CloseTime = 17,
            Rate = 1,
            Icon = "museum",
            Longitude = 26.228435,
            Latitude = 50.624170
        });

            context.DBPlaces.Add(
            new DBPlace
            {
                Name = "Готель \"Турист\"",
                LinkRef = "<a href =\"http://rivnetourist.com.ua/\" target=\"_blank\" title=\"Opens in a new window\">",
                LinkText = "Готель \"Турист\"",
                AboutPlace = " - побудовано за індивідуальним проектом і введено в експлуатацію у 1989 році. Усі номери готелю \"Турист\" вирізняються по-домашньому затишним інтер’єром. ",
                OpenTime = 10,
                CloseTime = 21,
                Rate = 3,
                Icon = "lodging",
                Longitude = 26.281428,
                Latitude = 50.615225
            });

            context.DBPlaces.Add(
             new DBPlace
             {
                 Name = "Готель \"Мир\"",
                 LinkRef = "<a href =\"http://mir-hotel.com/\" target=\"_blank\" title=\"Opens in a new window\">",
                 LinkText = "Готель \"Мир\"",
                 AboutPlace = " - сучасний готель з європейським обличчям, що розташований у центрі Рівного. ",
                 OpenTime = 7,
                 CloseTime = 22,
                 Rate = 4,
                 Icon = "lodging",
                 Longitude = 26.253623,
                 Latitude = 50.622340
             });            

            context.SaveChanges();
        }
    }
}