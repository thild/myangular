using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using myangular.Models;

namespace myangular.Data
{

    public class MyAngularContext : DbContext
    {

        ILogger<MyAngularContext> _logger;

        public MyAngularContext(DbContextOptions<MyAngularContext> options, ILogger<MyAngularContext> logger)
          : base(options)
        {
            _logger = logger;
        }

        public DbSet<Estado> Estados { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

        }

        public static void InitDb(MyAngularContext context)
        {
            System.IO.File.Delete("./Data/database.sqlite");
            context.Database.EnsureCreated();
            context.Estados.AddRange(
                new Estado
                {
                    Nome = "Paraná"
                },
                new Estado
                {
                    Nome = "Santa Catarina"
                },
                new Estado
                {
                    Nome = "Rio Grande do Sul"
                }
            );
            context.SaveChanges();
        }
    }
}