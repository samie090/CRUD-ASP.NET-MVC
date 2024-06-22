using AjaxJQueryFunctionality.Models;
using Microsoft.EntityFrameworkCore;

namespace AjaxJQueryFunctionality.Data
{
    public class AjaxContext: DbContext
    {
        public AjaxContext(DbContextOptions<AjaxContext> options) : base(options)
        {
        }
        public DbSet<Clients> Clients { get; set; }
    }
}
