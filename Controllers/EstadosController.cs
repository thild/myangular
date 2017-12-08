using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using myangular.Data;
using myangular.Models;

namespace myangular.Controllers
{

    [Route("api/[controller]")]
    public class EstadosController : Controller
    {

        ILogger<EstadosController> _logger;
        public MyAngularContext Context { get; }

        public EstadosController(ILogger<EstadosController> logger, MyAngularContext context)
        {
            this.Context = context;
            _logger = logger;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(Context.Estados.ToList());
            }
            catch (Exception)
            {
                _logger.LogError("Failed to execute GET");
                return BadRequest();
            }
        }

        [HttpGet("{id}")]
        public IActionResult Get(Guid id)
        {
            try
            {
                return Ok(Context.Estados.SingleOrDefault(m => m.Id == id));
            }
            catch (Exception)
            {
                _logger.LogError("Failed to execute GET");
                return BadRequest();
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] Estado model)
        {
            try
            {
                Context.Add(model);
                Context.SaveChanges();
                return Created($"/api/estados/{model.Id}", model);
            }
            catch (Exception)
            {
                _logger.LogError("Failed to execute POST");
                return BadRequest();
            }
        }

        [HttpPut("{id}")]
        public IActionResult Put(Guid id, [FromBody] Estado model)
        {
            try
            {
                var old = Context.Estados.SingleOrDefault(m => m.Id == id);
                old.Nome = model.Nome;
                Context.SaveChanges();
                return NoContent();
            }
            catch (Exception)
            {
                _logger.LogError("Failed to execute PUT");
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            try
            {
                var entity = Context.Estados.SingleOrDefault(m => m.Id == id);
                Context.Remove(entity);
                Context.SaveChanges();
                return NoContent();
            }
            catch (Exception)
            {
                _logger.LogError("Failed to execute DELETE");
                return BadRequest();
            }
        }
    }
}