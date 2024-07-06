using System;
using System.Collections.Generic;

namespace TaskList.Models
{
    public partial class Task
    {
        public int IdTask { get; set; }
        public string? TaskDescription { get; set; }
        public DateTime? CreationDate { get; set; }
    }
}
