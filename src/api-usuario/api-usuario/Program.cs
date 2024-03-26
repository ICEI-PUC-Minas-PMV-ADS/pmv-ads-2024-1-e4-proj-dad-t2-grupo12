using api_usuario.Models;
using api_usuario.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.Configure<UsuarioDatabaseSettings>(builder.Configuration.GetSection("UsuarioDatabase"));
builder.Services.AddSingleton<UsuarioService>();

builder.Services.Configure<SetorDatabaseSettings>(builder.Configuration.GetSection("UsuarioDatabase"));
builder.Services.AddSingleton<SetorService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
