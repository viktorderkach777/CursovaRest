namespace DAL
{
    using DAL.Models;
    using System.Data.Entity;

    public class Library : DbContext
    {
        // Your context has been configured to use a 'Library' connection string from your application's 
        // configuration file (App.config or Web.config). By default, this connection string targets the 
        // 'DAL.Library' database on your LocalDb instance. 
        // 
        // If you wish to target a different database and/or database provider, modify the 'Library' 
        // connection string in the application configuration file.
        public Library()
            : base("name=Library")
        {
            Database.SetInitializer<Library>(new CustomInitializer<Library>());
        }

        // Add a DbSet for each entity type that you want to include in your model. For more information 
        // on configuring and using a Code First model, see http://go.microsoft.com/fwlink/?LinkId=390109.

        //public virtual DbSet<Place> Places { get; set; }
        public virtual DbSet<DBPlace> DBPlaces { get; set; }
        //public virtual DbSet <User> Users { get; set; }
        public virtual DbSet<DBUser> DBUsers { get; set; }
    }
}