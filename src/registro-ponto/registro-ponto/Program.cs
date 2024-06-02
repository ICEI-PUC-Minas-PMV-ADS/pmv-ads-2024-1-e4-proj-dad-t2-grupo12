using registro_ponto.Models;
using registro_ponto.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.Configure<PontoDatabaseSettings>(builder.Configuration.GetSection("PontoDatabase"));
builder.Services.AddSingleton<PontoService>();
builder.Services.Configure<HoleriteDatabaseSettings>(builder.Configuration.GetSection("PontoDatabase"));
builder.Services.AddSingleton<HoleriteService>();
builder.Services.Configure<RegistroSolicitacaoDatabaseSettings>(builder.Configuration.GetSection("PontoDatabase"));
builder.Services.AddSingleton<RegistroSolicitacaoService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddHostedService<RotinaHostedService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();