using AjaxJQueryFunctionality.Data;
using AjaxJQueryFunctionality.Models;
using Microsoft.AspNetCore.Mvc;

namespace AjaxJQueryFunctionality.Controllers
{
    public class AjaxController : Controller
    {
        private readonly AjaxContext _context;

        public AjaxController(AjaxContext context) 
        {
            _context = context;
        }    
        public IActionResult Index()
        {
            return View();
        }
        public JsonResult ClientsList()
        {
            var data = _context.Clients.ToList();
            return new JsonResult(data);
        }
        [HttpPost]
        public JsonResult AddClient(Clients emp1)
        {
            var emp2 = new Clients()
            {                                     /*Creating new object*/
                Name = emp1.Name,                 /*Initializing attribute values*/
                City = emp1.City,
                Salary = emp1.Salary,

            };
            _context.Clients.Add(emp2);        /*Adding newly created obj to table*/
            _context.SaveChanges();
            return new JsonResult("Data Saved:Controller");
        }

        public JsonResult DeleteRecord(int id)
        {
            var emp = _context.Clients.SingleOrDefault(x => x.Id == id);
            _context.Clients.Remove(emp);
            _context.SaveChanges();
            return new JsonResult("Deleted");
        } 
        public JsonResult EditRecord(int id)
        {
            var emp = _context.Clients.SingleOrDefault(x => x.Id == id);
            return new JsonResult(emp);
        }
        [HttpPost]
        public JsonResult UpdateRecord(Clients emp1)
        {
            _context.Clients.Update(emp1);
            _context.SaveChanges();
            return new JsonResult("Record Updated");
        }
    }
}
