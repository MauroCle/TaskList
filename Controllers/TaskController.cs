using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskList.Models;

namespace TaskList.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly AppTaskListContext _appTaskListContext;

        public TaskController(AppTaskListContext appTaskListContext) //ctor
        {
            _appTaskListContext = appTaskListContext;
        }


        [HttpGet]
        [Route("List")]
        public async Task<IActionResult> List()
        {
            List<Models.Task> tasksList = _appTaskListContext.Tasks.OrderByDescending(t => t.IdTask).ThenBy(t => t.CreationDate).ToList();
            return StatusCode(StatusCodes.Status200OK, tasksList);

        }

        [HttpPost]
        [Route("NewTask")]
        public async Task<IActionResult> NewTask([FromBody] Models.Task request)
        {
            await _appTaskListContext.Tasks.AddAsync(request);
            await _appTaskListContext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "Ok");
        }

        [HttpDelete]
        [Route("EndTask/{id:int}")]
        public async Task<IActionResult> EndTask(int id)
        {
            Models.Task task = _appTaskListContext.Tasks.Find(id);
            _appTaskListContext.Tasks.Remove(task);
            await _appTaskListContext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "Ok");
        }


    }
}
