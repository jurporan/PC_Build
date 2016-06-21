package controllers

import models._
import play.api.db.slick._
import play.api.db.slick.Config.driver.simple._
import play.api.data._
import play.api.data.Forms._
import play.api.mvc._
import play.api.Play.current
import play.api.mvc.BodyParsers._
import play.api.libs.json.Json
import play.api.libs.json.Json._
import views.html.index

object Application extends Controller {

  val processors = TableQuery[ProcessorTable]
  val motherboards = TableQuery[MotherboardTable]
  val memories = TableQuery[MemoryTable]
  val storages = TableQuery[StorageTable]
  val graphicCards = TableQuery[GraphicCardTable]
  val alimentations = TableQuery[AlimentationTable]
  val computerCases = TableQuery[ComputerCaseTable]

  implicit val processorFormat = Json.format[Processor]
  implicit val motherboardFormat = Json.format[Motherboard]
  implicit val memoryFormat = Json.format[Memory]
  implicit val storageFormat = Json.format[Storage]
  implicit val graphicCardFormat = Json.format[GraphicCard]
  implicit val alimentationFormat = Json.format[Alimentation]
  implicit val computerCasesFormat = Json.format[ComputerCase]

  def root = DBAction { implicit rs =>
    Ok(index())
  }

  def getProcessors() = DBAction { implicit rs =>
    val json = Json.toJson(processors.list);
    Ok(json)
  }

  def getMotherboards(socket: String) = DBAction { implicit rs =>
    val json = Json.toJson(motherboards.filter(_.socket === socket).list);
    Ok(json)
  }

  def getMemories(memoryType: String) = DBAction { implicit rs =>
    val json = Json.toJson(memories.filter(_.memoryType === memoryType).list);
    Ok(json)
  }

  def getStorages() = DBAction { implicit rs =>
    val json = Json.toJson(storages.list);
    Ok(json)
  }

  def getGraphicCards() = DBAction { implicit rs =>
    val json = Json.toJson(graphicCards.list);
    Ok(json)
  }

  def getAlimentations(power: Float) = DBAction { implicit rs =>
    val json = Json.toJson(alimentations.filter(_.power >= power).list);
    Ok(json)
  }

  def getComputerCases(gcLength: Float) = DBAction { implicit rs =>
    val json = Json.toJson(computerCases.filter(_.gc_max_length > gcLength).list);
    Ok(json)
  }

  def getProcessorsFrequencyRange() = DBAction {implicit rs =>
    val minFrequency = processors.sortBy(_.frequency.asc).take(1).list.head.frequency
    val maxFrequency = processors.sortBy(_.frequency.desc).take(1).list.head.frequency
    val json = Json.toJson(List(minFrequency, maxFrequency))
    Ok(json)
  }

  def getMemorySizeRange() = DBAction {implicit rs =>
    val minSize = memories.sortBy(_.memorySize.asc).take(1).list.head.memorySize
    val maxSize = memories.sortBy(_.memorySize.desc).take(1).list.head.memorySize
    val json = Json.toJson(List(minSize, maxSize))
    Ok(json)
  }

  def getStorageSizeRange() = DBAction {implicit rs =>
    val minSize = storages.sortBy(_.gigabytes.asc).take(1).list.head.gigabytes
    val maxSize = storages.sortBy(_.gigabytes.desc).take(1).list.head.gigabytes
    val json = Json.toJson(List(minSize, maxSize))
    Ok(json)
  }

  def getStorageRPMRange() = DBAction {implicit rs =>
    val minRPM = storages.sortBy(_.rotationSpeed.asc).take(1).list.head.rotationSpeed
    val maxRPM = storages.sortBy(_.rotationSpeed.desc).take(1).list.head.rotationSpeed
    val json = Json.toJson(List(minRPM, maxRPM))
    Ok(json)
  }

  def getGraphicMemoryRange() = DBAction {implicit rs =>
    val minMem = graphicCards.sortBy(_.memory.asc).take(1).list.head.memory
    val maxMem = graphicCards.sortBy(_.memory.desc).take(1).list.head.memory
    val json = Json.toJson(List(minMem, maxMem))
    Ok(json)
  }

  def getGraphicFrequencyRange() = DBAction {implicit rs =>
    val minFreq = graphicCards.sortBy(_.frequency.asc).take(1).list.head.frequency
    val maxFreq = graphicCards.sortBy(_.frequency.desc).take(1).list.head.frequency
    val json = Json.toJson(List(minFreq, maxFreq))
    Ok(json)
  }

}
